import { Component, OnInit } from '@angular/core';
import { ServersettingsService } from './serversettings.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastServiceAlert } from 'src/toastAlert.services';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-server-settings',
  templateUrl: './server-settings.component.html',
  styleUrls: ['./server-settings.component.scss']
})
export class ServerSettingsComponent implements OnInit {
  updatedApp:string='';
  msgUpdateApp:string='';
  updateConfig:string='';
  msgUpdateConfig:string='';
  newVersionApp:string='';
  newVersionConfig:string='';

  details:any;
  showEditServerAlias:boolean = false;
  show: boolean = false;
  // versionCloud:  any  = (versionsCloud  as  any).default;

  serverAliasForm =new FormGroup({
    serverAliasInput:new FormControl('',[Validators.required]),
  });

  constructor(private SvcServerSettings: ServersettingsService,
    private toastServiceAlert:ToastServiceAlert,private Cookie: CookieService, ) { }

  ngOnInit(): void {
    this.updateIpWifi();
   this.getdata();
  }

  updateIpWifi(){
    this.SvcServerSettings.getIpWireless().subscribe();
  }

  getdata(){
     this.SvcServerSettings.getDetailsServer().subscribe(
      (data:any)=>{
        this.details = data;
        console.log(this.details)
      }, error =>{
        console.log(error)
      }
    );

    this.SvcServerSettings.getVersions().subscribe(
      (data:any)=>{

        if(data.aedpayCloud > data.aedpay){
          this.newVersionApp = data.aedpayCloud;
          this.updatedApp = 'updateAedpay';
          this.msgUpdateApp = 'aedpay has a new version. You currently have version '+data.aedpay+'. Do you want to get version '+data.aedpayCloud+' right now?';
        }else{
          this.updatedApp = 'aedpayUpdated';
          this.msgUpdateApp = 'aedpay updated to the latest version '+data.aedpayCloud;
        }


        if(data.managementAppCloud > data.managementApp){
          this.newVersionConfig = data.managementAppCloud ;
          this.updateConfig = 'updateConfig';
          this.msgUpdateConfig = 'aedpay has a new AppConfig version. You currently have version '+data.managementApp+'. Do you want to get version '+data.managementAppCloud+' right now?';
        }else{
          this.updateConfig = 'ConfigUpdated';
          this.msgUpdateConfig = 'appConfig updated to the latest version '+data.managementAppCloud;
        }

      }, error =>{
        console.log(error)
      }
    );
  }

  editserverAlias(server:any){
    this.serverAliasForm.controls['serverAliasInput'].setValue(server);
    this.showEditServerAlias = !this.showEditServerAlias;
  }

  updateServerAlias(){
    console.log(this.serverAliasForm.value)
    if(this.serverAliasForm.valid){
        this.SvcServerSettings.updateServerAlias(this.serverAliasForm.value).subscribe(
      ()=>{
        this.getdata();
        this.showEditServerAlias = false;
      }, error =>{
        console.log(error)
      }
    )
    }else{
      this.toastServiceAlert.show("Required", { classname: 'fixed bottom-0 right-0 m-1', delay: 5000 })
    }
  
  }

  clickUpdateAppAedPay(){
    if(navigator.onLine){
      var jsonUpdate = 
      {
          "typeRepository": this.updatedApp,
          "newVersion": this.newVersionApp 
      };

      this.SvcServerSettings.updateApp(jsonUpdate).subscribe(
      ()=>{
        this.getdata();
      }, error =>{
        console.log(error)
      }
    );
    }else{ 
    this.toastServiceAlert.show("You are not connected to the internet", { classname:'fixed bottom-0 right-0 m-1', delay: 5000 });     
    }    
  }

  clickUpdateAppConfig(){    
    if(navigator.onLine){
      var jsonUpdate = 
      {
          "typeRepository": this.updateConfig,
          "newVersion": this.newVersionConfig 
      };
      this.SvcServerSettings.updateApp(jsonUpdate).subscribe(
      ()=>{
        this.getdata();
      }, error =>{
        console.log(error)
      }
    )
    }else{
      this.toastServiceAlert.show("You are not connected to the internet", { classname: 'fixed bottom-0 right-0 m-1', delay: 5000 });     
    }   
  }

  seepassword():void{
    this.show = !this.show;
  } 

}

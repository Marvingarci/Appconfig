import { Component, OnInit } from '@angular/core';
import { ServersettingsService } from './serversettings.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as versionsCloud from './../../../../versionsaedpay.json'; 
import { ToastServiceAlert } from 'src/toastAlert.services';

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
  versionCloud:  any  = (versionsCloud  as  any).default;

  serverAliasForm =new FormGroup({
    serverAliasInput:new FormControl('',[Validators.required]),
  });

  constructor(private SvcServerSettings: ServersettingsService,
    private toastAlertService:ToastServiceAlert) { }

  ngOnInit(): void {
   this.getdata();
  }

  getdata(){
     this.SvcServerSettings.getDetailsServer().subscribe(
      (data:any)=>{
        this.details = data[0]
        console.log(this.details)
      }, error =>{
        console.log(error)
      }
    );

    this.SvcServerSettings.getVersions().subscribe(
      (data:any)=>{
        
        //verificacion de actualizacinoes del aedpay
        if(parseFloat(this.versionCloud[this.versionCloud.length-1].appAngularVersion) > data[0].appAngular ){
          if(parseFloat(this.versionCloud[this.versionCloud.length-1].appLaravelVersion) > data[0].appLaravel){
            this.updatedApp = 'updateBoth';
            this.newVersionApp = this.versionCloud[this.versionCloud.length-1].appAngularVersion;
            this.msgUpdateApp = 'aedpay has a new version. You currently have version '+data[0].appAngular+'. Do you want to get version '+this.versionCloud[this.versionCloud.length-1].appAngularVersion+' right now?';
            }else{
              this.newVersionApp = this.versionCloud[this.versionCloud.length-1].appAngularVersion;
              this.updatedApp = 'updateOnlyAngular';
              this.msgUpdateApp = 'aedpay has a new version. You currently have version '+data[0].appAngular+'. Do you want to get version '+this.versionCloud[this.versionCloud.length-1].appAngularVersion+' right now?';
            }
        }else{
          if(parseFloat(this.versionCloud[this.versionCloud.length-1].appLaravelVersion) > data[0].appLaravel){
            this.newVersionApp = this.versionCloud[this.versionCloud.length-1].appAngularVersion;
            this.updatedApp = 'updateOnlyLaravel';
            this.msgUpdateApp = 'aedpay has a new version. You currently have version '+data[0].appAngular+'. Do you want to get version '+this.versionCloud[this.versionCloud.length-1].appAngularVersion+' right now?';
            }else{
              this.updatedApp = 'AppUpdated';
              this.msgUpdateApp = 'aedpay updated to the latest version '+data[0].appAngular;
            }
        }


          if(parseFloat(this.versionCloud[this.versionCloud.length-1].configAngularVersion) > data[0].configAngular){
            this.newVersionConfig = this.versionCloud[this.versionCloud.length-1].configAngularVersion;
            this.updateConfig = 'updateOnlyConfig';
            this.msgUpdateConfig = 'aedpay has a new AppConfig version. You currently have version '+data[0].configAngular+'. Do you want to get version '+this.versionCloud[this.versionCloud.length-1].configAngularVersion+' right now?';

          }else{
            this.updateConfig = 'ConfigUpdated';
            this.msgUpdateConfig = 'appConfig updated to the latest version '+data[0].configAngular;
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
      this.toastAlertService.show("Required", { classname: ' ', delay: 2000 })
    }
  
  }

  clickUpdateAppAedPay(){
    if(navigator.onLine){
      this.SvcServerSettings.updateApp(this.updatedApp).subscribe(
      ()=>{
        this.getdata();
      }, error =>{
        console.log(error)
      }
    );
    }else{ 
    this.toastAlertService.show("You are not connected to the internet", { classname: ' ', delay: 20000 });     
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
      this.toastAlertService.show("You are not connected to the internet", { classname: ' ', delay: 2000 });     
    }   
  }

  seepassword():void{
    this.show = !this.show;
  } 

}

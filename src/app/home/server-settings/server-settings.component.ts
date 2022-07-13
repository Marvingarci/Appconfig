import { Component, OnInit } from '@angular/core';
import { ServersettingsService } from './serversettings.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastServiceAlert } from 'src/toastAlert.services';
import { CookieService } from 'ngx-cookie-service';
import { ToastServiceUpdate } from 'src/toastUpdate.services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/login/login.service';
import { Router } from '@angular/router';

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
    private modalService: NgbModal, 
    private toastServiceAlert:ToastServiceAlert,
    public toastUpdateService:ToastServiceUpdate,
    private cookieservices: CookieService,
    private SvcLogin: LoginService,    
    private router: Router) { }

  ngOnInit(): void {
   this.getdata();

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

        if(Number( data.aedpayCloud.replace(/\./g,'')) > Number(data.aedpay.replace(/\./g,''))){
          this.newVersionApp = data.aedpayCloud;
          this.updatedApp = 'updateAedpay';
          this.msgUpdateApp = 'aedpay has a new version. You currently have version '+data.aedpay+'. Do you want to get version '+data.aedpayCloud+' right now?';
        }else{
          this.updatedApp = 'aedpayUpdated';
          this.msgUpdateApp = 'aedpay updated to the latest version '+data.aedpay;
        }


        if(Number(data.managementAppCloud.replace(/\./g,'')) > Number(data.managementApp.replace(/\./g,''))){
          this.newVersionConfig = data.managementAppCloud ;
          this.updateConfig = 'updateConfig';
          this.msgUpdateConfig = 'aedpay has a new AppConfig version. You currently have version '+data.managementApp+'. Do you want to get version '+data.managementAppCloud+' right now?';
        }else{
          this.updateConfig = 'ConfigUpdated';
          this.msgUpdateConfig = 'appConfig updated to the latest version '+data.managementApp;
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
  openUpdateAppAedPay(content:any){
    this.modalService.open(content, {backdrop: false,centered:true,size: 'md'});
  }
  clickUpdateAppAedPay(){
    if(navigator.onLine){
      this.modalService.dismissAll();   
      var jsonUpdate = 
      {
          "typeRepository": this.updatedApp,
          "newVersion": this.newVersionApp 
      };

      this.SvcServerSettings.updateApp(jsonUpdate).subscribe(
      (data:any)=>{
        console.log(data);
        this.toastServiceAlert.show(data, { classname:'fixed bottom-0 right-0 m-1', delay: 5000 });     
    
        this.getdata();
      }, error =>{
        console.log(error)
      }
    );
    }else{ 
    this.toastServiceAlert.show("You are not connected to the internet", { classname:'fixed bottom-0 right-0 m-1', delay: 5000 });  
    this.modalService.dismissAll();   
    }    
  }

  openUpdateAppConfig(content:any){
    this.modalService.open(content, {backdrop: false,centered:true,size: 'md'});
  }

  clickUpdateAppConfig(){ 
    if(navigator.onLine){
    this.modalService.dismissAll();   
      var jsonUpdate = 
      {
          "typeRepository": this.updateConfig,
          "newVersion": this.newVersionConfig 
      };

      this.SvcServerSettings.updateApp(jsonUpdate).subscribe(
      (data)=>{
        console.log(data);
        this.getdata();
      }, error =>{
        console.log(error)
      }
    );
    this.logout();

    }else{
      this.toastServiceAlert.show("You are not connected to the internet", { classname: 'fixed bottom-0 right-0 m-1', delay: 5000 }); 
      this.modalService.dismissAll();     
    }   
  }

  logout(){
    this.SvcLogin.logout().toPromise().then(
    (data:any) => { 
  this.cookieservices.deleteAll();
  this.router.navigate(['/']); 
  this.modalService.dismissAll(); 
    console.log(data)
  }
  ).catch((err:any) => {
      console.log(err);
  });
  }

  seepassword():void{
    this.show = !this.show;
  } 

}

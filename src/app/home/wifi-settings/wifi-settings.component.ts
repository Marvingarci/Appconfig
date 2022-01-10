import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/login/login.service';
import { ToastServiceAlert } from 'src/toastAlert.services';
import { HomeService } from '../home.service';
import { ServersettingsService } from '../server-settings/serversettings.service';

@Component({
  selector: 'app-wifi-settings',
  templateUrl: './wifi-settings.component.html',
  styleUrls: ['./wifi-settings.component.scss']
})
export class WifiSettingsComponent implements OnInit {
  passWiFi:string = '';
  routerName:string = '';
  formwifi:boolean = false;
  formrouter:boolean = false;
  formroutername:boolean = false;

  changePass = new FormGroup({
    password: new FormControl('',[Validators.required,Validators.minLength(8)])
  });

  changeRouter = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.minLength(3)])
  });

  constructor(private SvcServerSettings: ServersettingsService,
    private toastServiceAlert:ToastServiceAlert,
    private modalService: NgbModal,    
    private cookieservices: CookieService,
    private SvcLogin: LoginService,    
    private router: Router,
    private loading: NgxSpinnerService,
    private homeService:HomeService ) {
    this.getdata();
   }

  getdata(){
    this.SvcServerSettings.getNameRouter().toPromise()
    .then(
     (data:any)=>{
       console.log(data)
     }
   )
   .catch(error =>{
     console.log(error);
     if(error.status == 500){
      this.toastServiceAlert.show('Not connected to Mikrotik', { classname: 'fixed bottom-0 right-0 m-1', delay: 5000 });
     }
    });

    this.SvcServerSettings.getDetailsServer().toPromise()
    .then(
     (data:any)=>{
       console.log(data)
       this.passWiFi = data.wifiPassword;
       this.routerName = data.routerName;
     }
   )
   .catch(error =>{console.log(error)});
  }

  seeformwifi(){
    this.formwifi = true;
  }
  seeformrouterN(){
    this.formrouter = true;
  }
  cancelChengePass(){
    this.formwifi = false;
    this.changePass.controls['password'].setValue('');
  }
  cancelChengeRouter(){
    this.formrouter = false;
    this.changeRouter.controls['name'].setValue('');
  }

  openChangePass(content:any){
    if(this.changePass.valid){
      this.modalService.open(content, {backdrop: false,centered:true,size: 'md'});
    }else {
      this.toastServiceAlert.show('Required field', { classname: 'fixed bottom-0 right-0 m-1', delay: 5000 })
    }
    
  }

  openChangeRouter(content:any){
    if(this.changeRouter.valid){
      this.modalService.open(content, {backdrop: false,centered:true,size: 'md'});
    }else {
      this.toastServiceAlert.show('Required field', { classname: 'fixed bottom-0 right-0 m-1', delay: 5000 })
    }
    
  }

  saveChangePass(){
      this.homeService.titleloading.emit('Changing WiFi Password');
      this.loading.show();
      this.SvcServerSettings.changeWifiPass(this.changePass.value).toPromise()
      .then(
      (data:any)=>{
        this.loading.hide(); 
        this.logout();
        this.modalService.dismissAll();
        this.toastServiceAlert.show(data, { classname: 'fixed bottom-0 right-0 m-1', delay: 5000 });
        
      })
      .catch(
        error =>{
          console.log(error);
          if(error.status == 500){
            this.toastServiceAlert.show('Not connected to Mikrotik', { classname: 'fixed bottom-0 right-0 m-1', delay: 5000 });
           }
          this.loading.hide(); 
          this.modalService.dismissAll();
        }
        );
  }

  saveChangeRouter(){
    this.homeService.titleloading.emit('Changing Router Name');
    this.loading.show();
    this.SvcServerSettings.changeRouterName(this.changeRouter.value).toPromise()
    .then(
    (data:any)=>{
      this.loading.hide();
      this.logout();
      this.modalService.dismissAll();
      this.toastServiceAlert.show(data, { classname: 'fixed bottom-0 right-0 m-1', delay: 5000 });
      
    })
    .catch(error =>{
      console.log(error);
          if(error.status == 500){
            this.toastServiceAlert.show('Not connected to Mikrotik', { classname: 'fixed bottom-0 right-0 m-1', delay: 5000 });
           }
          this.loading.hide(); 
          this.modalService.dismissAll();

    });
}

  logout(){
    this.SvcLogin.logout().toPromise().then(
    (data:any) => { 
  this.cookieservices.deleteAll();
  this.router.navigate(['/']);
  
    console.log(data)
  }
  ).catch((err:any) => {
      console.log(err);
  });
  }



  ngOnInit(): void {
  }

}
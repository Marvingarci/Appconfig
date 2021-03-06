import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastServiceAlert } from 'src/toastAlert.services';
import { TestService } from '../test.service';
import { LoginService } from './login.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastServiceUpdate } from 'src/toastUpdate.services';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
 
  // versionCloud:  any  = (versionsCloud  as  any).default;
  // versionActual:  any  = (versionActual  as  any).default;
  titleloading:any;start:any;
  msgToast:any;
  requeriedfields:boolean =false;
  username:boolean =false;
  password:boolean =false;
  invalidcredencials:boolean = false;
  show: boolean = false;

  constructor(private Cookie: CookieService, 
              private SvcLogin: LoginService, 
              private form:FormBuilder, 
              private router: Router, 
              private toastServiceAlert: ToastServiceAlert,
              private loading: NgxSpinnerService,
              public toastUpdateService:ToastServiceUpdate,
              private homeService:HomeService){
  }

  public formLogin! : FormGroup;

  ngOnInit():void{
    this.SvcLogin.start().toPromise().then((data)=>(this.start = data,console.log(data))).catch((error)=>console.log(error));

    console.log(this.start)
    this.formLogin = this.form.group({
      username : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required]],
    })
  }

  seepassword():void{
    this.show = !this.show;
  }

  login(){
    this.username= false;this.password = false;this.requeriedfields =false;this.invalidcredencials = false;
    if(this.formLogin.valid){

     
      
      //title loadin
      if(this.start == "Need Setup"){ 
        this.homeService.titleloading.emit('Setting Up');
        // this.titleloading = "Setting Up";
      }else{
        this.homeService.titleloading.emit('Logging in');
        // this.titleloading = "Logging in" 
      }      
      this.loading.show();

      this.SvcLogin.execphpLogin(this.formLogin.value).subscribe(
        (res:any) => {
          this.Cookie.set('dbServer', res.dbServerLocal);
          this.Cookie.set('token', res.token);
          this.Cookie.set('fullName', res.fullName);
          this.Cookie.set('companyLegalName', res.companyLegalName);
          //console.log(this.Cookie.get('dbServer'))
          this.router.navigate(['home/serverSettings'])

          this.toastServiceAlert.show('Welcome '+res.fullName, { classname: 'fixed bottom-0 right-0 m-1', delay: 5000 });   
          this.loading.hide();  

          this.SvcLogin.getVersions().subscribe(
            (data:any)=>{      
              if(data.aedpayCloud > data.aedpay){
                this.msgToast ='aedpay has a new version. You currently have version '+data.aedpay+'. Do you want to get version '+data.aedpayCloud+' right now?';   
                this.toastUpdateService.show(this.msgToast, {classname: 'fixed bottom-0 right-0 font-bold w-full ml-1/5', delay: 20000 }); 
             }
            }, error =>{
              console.log(error)
            }
          );
                                 
      }, (err) => {
          console.log(err);
          if(err.status == 302){
            this.toastServiceAlert.show(err.error, { classname: 'fixed bottom-0 right-0 m-1', delay: 5000 }); 
          }else if (err.status == 402){
            this.invalidcredencials =true;
            this.toastServiceAlert.show(err.error, { classname: 'fixed bottom-0 right-0 m-1', delay: 5000 });  
          }else if (err.status == 0){
            this.toastServiceAlert.show('Connect to the local network', { classname: 'fixed bottom-0 right-0 m-1', delay: 5000 });  
          }else{
            this.toastServiceAlert.show('An error has occurred', { classname: 'fixed bottom-0 right-0 m-1', delay: 5000 });  
          }
          this.loading.hide();             
        }
      );
    }else{
      if((this.formLogin.value.username == "" && this.formLogin.value.password == "")|| (this.formLogin.value.username == "")||(this.formLogin.value.password == "")){
        this.toastServiceAlert.show('required fields', { classname: 'fixed bottom-0 right-0 m-1', delay: 5000 });
        this.requeriedfields = true;
      }else  if(!this.formLogin.value.username.valid ){
        this.toastServiceAlert.show('username invalid', { classname: 'fixed bottom-0 right-0 m-1', delay: 5000 });
        this.username =true;
      }
    }
  }


}

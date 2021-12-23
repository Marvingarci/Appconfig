import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastServiceAlert } from 'src/toastAlert.services';
import { TestService } from '../test.service';
import { LoginService } from './login.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastServiceUpdate } from 'src/toastUpdate.services';

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

  constructor(private Cookie: CookieService, 
              private SvcLogin: LoginService, 
              private form:FormBuilder, 
              private router: Router, 
              private toastServiceAlert: ToastServiceAlert,
              private loading: NgxSpinnerService,
              public toastUpdateService:ToastServiceUpdate){
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

  // save() {
  //   console.log(this.formInfo.value);
  //   this.test.post(this.formInfo.value).subscribe(
  //     res => {
  //       console.log(res);
  //   }, (err) => {
  //       console.log(err);
  //   }
  //   );
  // }

  login(){
    if(this.formLogin.valid){
      
      //title loadin
      if(this.start == "Need Setup"){ this.titleloading = "Setting Up";}else{this.titleloading = "Logging in" }      
      this.loading.show();

      this.SvcLogin.execphpLogin(this.formLogin.value).subscribe(
        (res:any) => {
          this.Cookie.set('dbServer', res.dbServerLocal);
          this.Cookie.set('token', res.token);
          //console.log(this.Cookie.get('dbServer'))
          this.router.navigate(['home/serverSettings'])

          this.toastServiceAlert.show('Welcome', { classname: 'fixed bottom-0 right-0 m-1', delay: 5000 });   
          this.loading.hide();  

          this.SvcLogin.getVersions().subscribe(
            (data:any)=>{      
              if(data.aedpayCloud > data.aedpay){
                this.msgToast ='aedpay has a new version. You currently have version '+data.aedpay+'. Do you want to get version '+data.aedpayCloud+' right now?';   
                this.toastUpdateService.show(this.msgToast, { classname: ' text-light fixed  left-0  bottom-0 h-16 mb-2 ', delay: 20000 }); 
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
            this.toastServiceAlert.show(err.error, { classname: 'fixed bottom-0 right-0 m-1', delay: 5000 });  
          }else{
            this.toastServiceAlert.show('An error has occurred', { classname: 'fixed bottom-0 right-0 m-1', delay: 5000 });  
          }
          this.loading.hide();             
        }
      );
    }else{
      if((this.formLogin.value.username == "" && this.formLogin.value.password == "")|| (this.formLogin.value.username == "")||(this.formLogin.value.password == "")){
        this.toastServiceAlert.show('required fields', { classname: 'fixed bottom-0 right-0 m-1', delay: 5000 });
      }else  if(!this.formLogin.value.username.valid ){
        this.toastServiceAlert.show('username invalid', { classname: 'fixed bottom-0 right-0 m-1', delay: 5000 });
      }
    }
  }


}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastServiceAlert } from 'src/toastAlert.services';
import { TestService } from '../test.service';
import { LoginService } from './login.service';
import { NgxSpinnerService } from "ngx-spinner";
import * as versionsCloud from './../../../versionsaedpay.json'; 
import * as versionActual from './../../../version.json';
import { ToastServiceUpdate } from 'src/toastUpdate.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
 
  versionCloud:  any  = (versionsCloud  as  any).default;
  versionActual:  any  = (versionActual  as  any).default;
  actualV:any;
  newV:any;
  msgToast:any;
  events:any;

  constructor(private Cookie: CookieService, 
              private SvcLogin: LoginService, 
              private form:FormBuilder, 
              private router: Router, 
              private alert: ToastServiceAlert,
              private loading: NgxSpinnerService,
              public toastUpdateService:ToastServiceUpdate){
  }

  public formLogin! : FormGroup;

  ngOnInit():void{
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
      this.loading.show();
      this.SvcLogin.execphpLogin(this.formLogin.value).subscribe(
        res => {
          console.log(res);
          this.Cookie.set('dbServer', res.toString());
          //console.log(this.Cookie.get('dbServer'))
          this.router.navigate(['home/serverSettings'])
          this.alert.show('Welcome', { classname:'text-light', delay: 5000 });     
          this.loading.hide();  
          if(parseFloat(this.versionCloud[this.versionCloud.length-1].appAngularVersion) > parseFloat(this.versionActual[0].version)){
            this.actualV = this.versionActual[0].version; //la version dentro del json local
            this.newV = this.versionCloud[this.versionCloud.length-1].appAngularVersion; //consuminedo la API de versiones de aedpay
            this.msgToast ='aedpay has a new version. You currently have version '+this.actualV+'. Do you want to get version '+this.newV+' right now?';   
            this.toastUpdateService.show(this.msgToast, { classname: ' text-light fixed  left-0  bottom-0 h-16 mb-2 ', delay: 20000 }); 
           }                   
      }, (err) => {
          console.log(err);
          this.alert.show('invalid', { classname:'text-light', delay: 5000 });
          this.loading.hide();             
        }
      );
    }
  }


  title = 'testingCreateddatabase';
}

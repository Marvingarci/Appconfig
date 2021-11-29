import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastServiceAlert } from 'src/toastAlert.services';
import { TestService } from '../test.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  // formInfo = new FormGroup({
  //   servername: new FormControl('',[]),
  //   username:new FormControl('',[]),
  //   password: new FormControl('',[])
  // });

  constructor(private Cookie: CookieService, private SvcLogin: LoginService, private form:FormBuilder, private router: Router, private alert: ToastServiceAlert){

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
      this.SvcLogin.execphpLogin(this.formLogin.value).subscribe(
        res => {
          //console.log(res);
          this.Cookie.set('dbServer', res.toString());
          //console.log(this.Cookie.get('dbServer'))
          this.router.navigate(['home'])
          this.alert.show('Welcome', { classname:'text-light', delay: 5000 });             
      }, (err) => {
          console.log(err);
          this.alert.show('invalid', { classname:'text-light', delay: 5000 });             
        }
      );
    }
  }


  title = 'testingCreateddatabase';
}

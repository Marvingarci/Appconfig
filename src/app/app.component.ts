import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TestService } from './test.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  // formInfo = new FormGroup({
  //   servername: new FormControl('',[]),
  //   username:new FormControl('',[]),
  //   password: new FormControl('',[])
  // });

  constructor(private test: TestService, private form:FormBuilder, private router: Router){

  }

  public formLogin! : FormGroup;

  ngOnInit():void{
    this.formLogin = this.form.group({
      email : ['', [Validators.required, Validators.email]],
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
      this.router.navigate(['home']);
    }
  }


  title = 'testingCreateddatabase';
}
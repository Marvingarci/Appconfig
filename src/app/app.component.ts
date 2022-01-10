import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeService } from './home/home.service';
import { TestService } from './test.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  


  constructor(private test: TestService, 
    private form:FormBuilder, 
    private router: Router,
    private homeService: HomeService
    ){

  }

  public formLogin! : FormGroup;
  titleloading:string = "";

  ngOnInit():void{
    this.formLogin = this.form.group({
      email : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required]],
    });
    //title of loading
    this.homeService.titleloading.subscribe(data => this.titleloading = data);
  }



  login(){
    if(this.formLogin.valid){
      this.router.navigate(['home']);
    }
  }


  title = 'testingCreateddatabase';
}
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import * as versionsCloud from './../../../../versionsaedpay.json'; 
// import * as versionActual from './../../../../version.json';
import { TestService } from 'src/app/test.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastServiceUpdate } from 'src/toastUpdate.services';
import { ToastServiceAlert } from 'src/toastAlert.services';
import { HomeService } from '../home.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { NavigationEnd, Router } from '@angular/router';
import { LoginService } from 'src/app/login/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {  

  fullName:string = "";
companyLegalName:string = "";


  // versionCloud:  any  = (versionsCloud  as  any).default;
  // versionActual:  any  = (versionActual  as  any).default;
  
  // actualV:any;
  // newV:any;
  // msgToast:any;
  // events:any;

@ViewChild('modallogout', {static: false}) content!: ElementRef;
url:any;
actionGoback:any;

  constructor( public toastUpdateService:ToastServiceUpdate,
    private test: TestService, 
    private modalService: NgbModal, 
    private router: Router, 
    private cookieservices: CookieService,
    private http:HttpClient,
    private SvcLogin: LoginService,
    public toastServiceAlert:ToastServiceAlert,
    private homeService: HomeService) {
      this.url = this.router.url;
      this.fullName = this.cookieservices.get('fullName');
this.companyLegalName = this.cookieservices.get('companyLegalName');
   }

   public getIPAddress()  
   {  
     return this.http.get("http://api.ipify.org/?format=json");  
   }  

    openmodallogout(content:any) {
      this.modalService.open(content, {backdrop: false,centered:true,size: 'md'});
    }
   

   logout(){
   
     this.SvcLogin.logout().subscribe(
      (data:any) => { 
    this.cookieservices.deleteAll();
    this.router.navigate(['/']);
    this.toastServiceAlert.show(data.message, { classname:'fixed bottom-0 right-0 m-1', delay: 5000 });
    this.modalService.dismissAll();
      console.log(data)
    }, (err:any) => {
        console.log(err);
    }
    );
   
   }

   changeclassactive(clas:any){
     if(clas =='manage'){
      this.homeService.actionGoBack.emit('manageStore');//para el goback
    var miElto = document.getElementsByClassName("manageStore")[0];    
    miElto.className = "manageStore itemnavbaractive flex px-3 py-1 rounded-md  mb-3";   
    var miElto2 = document.getElementsByClassName("event")[0];    
    miElto2.className = "event logout  px-3 py-1 rounded-md  mb-3"; 
    var miElto3 = document.getElementsByClassName("wifisettings")[0];    
    miElto3.className = "wifisettings itemnavbar flex px-3 py-1 rounded-md  mb-3";      
     } else if(clas =='event'){      
      this.homeService.actionGoBack.emit('events');//para el goback
      var miElto = document.getElementsByClassName("manageStore")[0];    
      miElto.className = "manageStore itemnavbaractive flex px-3 py-1 rounded-md  mb-3"; 
      var miElto2 = document.getElementsByClassName("event")[0];    
      miElto2.className = "event itemnavbaractive  px-3 py-1 rounded-md  mb-3"; 
     }else if(clas =='wifi'){
      this.homeService.actionGoBack.emit('wifi');//para el goback
      var miElto = document.getElementsByClassName("manageStore")[0];    
      miElto.className = "manageStore itemnavbar flex px-3 py-1 rounded-md  mb-3"; 
      var miElto2 = document.getElementsByClassName("event")[0];    
      miElto2.className = "event itemnavbar flex px-3 py-1 rounded-md  mb-3"; 
      var miElto3 = document.getElementsByClassName("wifisettings")[0];    
      miElto3.className = "wifisettings itemnavbaractive flex px-3 py-1 rounded-md  mb-3"; 
       }else{

      this.homeService.actionGoBack.emit('');//para el goback
      var miElto = document.getElementsByClassName("manageStore")[0];    
      miElto.className = "manageStore itemnavbar flex px-3 py-1 rounded-md  mb-3"; 
      var miElto2 = document.getElementsByClassName("event")[0];    
      miElto2.className = "event itemnavbar  px-3 py-1 rounded-md  mb-3"; 
      var miElto3 = document.getElementsByClassName("wifisettings")[0];    
      miElto3.className = "wifisettings itemnavbar flex px-3 py-1 rounded-md  mb-3"; 
     }
 
    }

    goBack(){
 if(this.actionGoback == "selectEvent"){ 
  let currentUrl = this.router.url;
  this.router.navigateByUrl('/home', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
  });
  this.actionGoback = "events"
 }else if(this.actionGoback =="events"){
  this.router.navigate(['/home/serverSettings']);
  this.actionGoback = "";
  var miElto = document.getElementsByClassName("manageStore")[0];    
  miElto.className = "manageStore itemnavbar flex px-3 py-1 rounded-md  mb-3"; 
  var miElto2 = document.getElementsByClassName("event")[0];    
  miElto2.className = "event itemnavbar  px-3 py-1 rounded-md  mb-3"; 
  var miElto3 = document.getElementsByClassName("wifisettings")[0];    
  miElto3.className = "wifisettings itemnavbar flex px-3 py-1 rounded-md  mb-3"; 

 }else if(this.actionGoback =="manageStore"){
  this.actionGoback = "";
  var miElto = document.getElementsByClassName("manageStore")[0];    
  miElto.className = "manageStore itemnavbar flex px-3 py-1 rounded-md  mb-3"; 
  var miElto2 = document.getElementsByClassName("event")[0];    
  miElto2.className = "event itemnavbar  px-3 py-1 rounded-md  mb-3"; 
  var miElto3 = document.getElementsByClassName("wifisettings")[0];    
  miElto3.className = "wifisettings itemnavbar flex px-3 py-1 rounded-md  mb-3"; 

 }else if(this.actionGoback == "wifi"){
  this.router.navigate(['/home/serverSettings']);
  this.actionGoback = "";
  var miElto = document.getElementsByClassName("manageStore")[0];    
  miElto.className = "manageStore itemnavbar flex px-3 py-1 rounded-md  mb-3"; 
  var miElto2 = document.getElementsByClassName("event")[0];    
  miElto2.className = "event itemnavbar  px-3 py-1 rounded-md  mb-3"; 
  var miElto3 = document.getElementsByClassName("wifisettings")[0];    
  miElto3.className = "wifisettings itemnavbar flex px-3 py-1 rounded-md  mb-3"; 

 }
}



  

  
  ngOnInit() { 
    this.homeService.actionGoBack.subscribe(
      (data) => {this.actionGoback = data},
      (err)=>{console.log(err)});
   }


  ngAfterViewInit() {

  }


  updateVersion(){
    this.test.execphp().subscribe(
      res => {
        console.log(res);
        this.modalService.dismissAll();
        window.location.reload();
    }, (err) => {
        console.log(err);
    }
    );
  }

}



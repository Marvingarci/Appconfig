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
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {  


  // versionCloud:  any  = (versionsCloud  as  any).default;
  // versionActual:  any  = (versionActual  as  any).default;
  
  // actualV:any;
  // newV:any;
  // msgToast:any;
  // events:any;

@ViewChild('modallogout', {static: false}) content!: ElementRef;;
url:any;

  constructor( public toastUpdateService:ToastServiceUpdate,
    private test: TestService, 
    private modalService: NgbModal, 
    private router: Router, 
    private cookieservices: CookieService,
    private http:HttpClient,
    private SvcLogin: LoginService,
    public toastServiceAlert:ToastServiceAlert) {
      this.url = this.router.url;
      console.log(this.url)
   }

   public getIPAddress()  
   {  
     return this.http.get("http://api.ipify.org/?format=json");  
   }  

    openmodallogout(content:any) {
      this.modalService.open(content)
    }
   

   logout(){
   
     this.SvcLogin.logout().subscribe(
      (data:any) => { 
    this.cookieservices.delete('token');
    this.cookieservices.delete('dbServer');
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
    var miElto = document.getElementsByClassName("manageStore")[0];    
    miElto.className = "manageStore itemnavbaractive flex px-3 py-1 rounded-md  mb-3";   
    var miElto2 = document.getElementsByClassName("event")[0];    
    miElto2.className = "event logout  px-3 py-1 rounded-md  mb-3"; 
    var miElto3 = document.getElementsByClassName("wifisettings")[0];    
    miElto3.className = "wifisettings itemnavbar flex px-3 py-1 rounded-md  mb-3";      
     } else if(clas =='event'){
      var miElto = document.getElementsByClassName("manageStore")[0];    
      miElto.className = "manageStore itemnavbaractive flex px-3 py-1 rounded-md  mb-3"; 
      var miElto2 = document.getElementsByClassName("event")[0];    
      miElto2.className = "event itemnavbaractive  px-3 py-1 rounded-md  mb-3"; 
     }else if(clas =='wifi'){
      var miElto = document.getElementsByClassName("manageStore")[0];    
      miElto.className = "manageStore itemnavbar flex px-3 py-1 rounded-md  mb-3"; 
      var miElto2 = document.getElementsByClassName("event")[0];    
      miElto2.className = "event itemnavbar flex px-3 py-1 rounded-md  mb-3"; 
      var miElto3 = document.getElementsByClassName("wifisettings")[0];    
      miElto3.className = "wifisettings itemnavbaractive flex px-3 py-1 rounded-md  mb-3"; 
       }else{
      var miElto = document.getElementsByClassName("manageStore")[0];    
      miElto.className = "manageStore itemnavbar flex px-3 py-1 rounded-md  mb-3"; 
      var miElto2 = document.getElementsByClassName("event")[0];    
      miElto2.className = "event itemnavbar  px-3 py-1 rounded-md  mb-3"; 
      var miElto3 = document.getElementsByClassName("wifisettings")[0];    
      miElto3.className = "wifisettings itemnavbar flex px-3 py-1 rounded-md  mb-3"; 
     }
 
    }

    goBack(action:any,root:any){

    }
   



  

  

  // events: Array<any> =[
  //   {
  //     eventId:"d837e36f-0b0e-4e5e-a76a-c06c98e2f50a",
  //     name:"Cancer day's charity",
  //     date:"12/12/2022",
  //     place:"High School Miami Saint George"
  //   },
  //   {
  //     eventId:"d837e36f-0b0e-4e5e-a76a-c06c98e2f50a",
  //     name:"Father's day charity",
  //     date:"11/03/2022",
  //     place:"Primary School Los Angeles"
  //   },
  //   {
  //     eventId:"d837e36f-0b0e-4e5e-a76a-c06c98e2f50a",
  //     name:"Mother's day's charity",
  //     date:"12/02/2021",
  //     place:"College US united for 3"
  //   },
  // ]
  ngOnInit(): void { 
   
   }



  ngAfterViewInit() {

   
      // if(parseFloat(this.versionCloud[this.versionCloud.length-1].appAngularVersion) > parseFloat(this.versionActual[0].version)){
      //  this.actualV = this.versionActual[0].version; //la version dentro del json local
      //  this.newV = this.versionCloud[this.versionCloud.length-1].version; //consuminedo la API de versiones de aedpay
      //  this.msgToast ='aedpay has a new version. You currently have version '+this.actualV+'. Do you want to get version '+this.newV+' right now?';   
      //  this.toastUpdateService.show(this.msgToast, { classname: ' text-light fixed  left-0  bottom-0 h-16 mb-2 ', delay: 20000 }); 
      // }
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



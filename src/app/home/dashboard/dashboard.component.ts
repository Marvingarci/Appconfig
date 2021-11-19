import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as versionsCloud from './../../../../versionsaedpay.json'; 
import * as versionActual from './../../../../version.json'; 
import { TestService } from 'src/app/test.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/toast.services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {  


  versionCloud:  any  = (versionsCloud  as  any).default;
  versionActual:  any  = (versionActual  as  any).default;
  
  actualV:any;
  newV:any;
  msgToast:any;

@ViewChild('modallogout', {static: false}) content!: ElementRef;;


  constructor( public toastService:ToastService,private test: TestService, private modalService: NgbModal) {
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

   
      if(parseFloat(this.versionCloud[this.versionCloud.length-1].version) > parseFloat(this.versionActual[0].version)){
       this.actualV = this.versionActual[0].version;
       this.newV = this.versionCloud[this.versionCloud.length-1].version;
      this.msgToast ='aedpay has a new version. You currently have version'+this.actualV+'. Do you want to get version '+this.newV+' right now?';
   
  this.toastService.show(this.msgToast,
   { classname: ' text-light fixed  left-0  bottom-0 h-16 mb-2 ', delay: 20000 });            
     
        // this.modalService.open(this.content, {backdrop :'static', backdropClass: 'light-blue-backdrop',size: 'lg', centered: true ,keyboard:false});
      }
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



import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as versionsC from './../../versionsaedpay.json'; 
import * as versionA from './../../../../angular.json'; 
import { TestService } from 'src/app/test.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  versionCloud:  any  = (versionsC  as  any).default;
  versionAngular:  any  = (versionA  as  any).default.version;
@ViewChild('modallogout', {static: false}) content!: ElementRef;;


  constructor(private test: TestService, private modalService: NgbModal) {
   }

  

  

  events: Array<any> =[
    {
      eventId:"d837e36f-0b0e-4e5e-a76a-c06c98e2f50a",
      name:"Cancer day's charity",
      date:"12/12/2022",
      place:"High School Miami Saint George"
    },
    {
      eventId:"d837e36f-0b0e-4e5e-a76a-c06c98e2f50a",
      name:"Father's day charity",
      date:"11/03/2022",
      place:"Primary School Los Angeles"
    },
    {
      eventId:"d837e36f-0b0e-4e5e-a76a-c06c98e2f50a",
      name:"Mother's day's charity",
      date:"12/02/2021",
      place:"College US united for 3"
    },
  ]
  ngOnInit(): void {  }


  ngAfterViewInit() {
      if(this.versionCloud[this.versionCloud.length-1].version != this.versionAngular){
        this.modalService.open(this.content, { size: 'lg', centered: true });
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

import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastServiceAlert } from 'src/toastAlert.services';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styles: []
})
export class ListEventsComponent implements OnInit {

  events:any;
  constructor(private homeService: HomeService, private cookies: CookieService,
    private toastServiceAlert: ToastServiceAlert,
    private loading2: NgxSpinnerService) { }
  event_id:any=null;
  ngOnInit(): void {
   this.getEvents();
  }

  getEvents():void{
    this.homeService.getEvents({'dbServer':this.cookies.get('dbServer')}).subscribe(
      (data:any)=>{
        this.events = data
      }, err=>{
        console.log(err)
      }
    )
  }

  downloadEvents():void{
      this.homeService.titleloading.emit('Download events');
    
    if(navigator.onLine){
      this.loading2.show();
      
      this.homeService.downloadEvents({'dbServer':this.cookies.get('dbServer')}).subscribe(
        (data:any)=>{
          this.toastServiceAlert.show(data, { classname: 'fixed bottom-0 right-0 m-1', delay: 5000 });  
          this.getEvents();
          this.loading2.hide();
        }, err=>{
          console.log(err);
          this.toastServiceAlert.show('An error has occurred', { classname: 'fixed bottom-0 right-0 m-1', delay: 5000 }); 
          this.loading2.hide();
        }
      );
    }else{
      this.toastServiceAlert.show("You are not connected to the internet", { classname:'fixed bottom-0 right-0 m-1', delay: 5000 });  
    }
  
  }


  orders(event_id:any){
    this.homeService.actionGoBack.emit('selectEvent');
    this.event_id = event_id;
  }

}

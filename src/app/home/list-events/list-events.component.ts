import { Component, DoCheck, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastServiceAlert } from 'src/toastAlert.services';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styles: []
})
export class ListEventsComponent implements OnInit,DoCheck {
  eventdata:any
  platform = '';
  showMobile = false;
  isIOS = false;
  isAndroid = false;
  h_screen:any
  searchForm  = new FormGroup({
    searchEvent:new FormControl('',[])
  })
  searchevent(){
   console.log(this.searchForm.value.searchEvent)
   let filter1:any  = this.eventdata.filter((x:any) => x['sponsor'].toLowerCase().includes(this.searchForm.value.searchEvent.toLowerCase()))
  //  let filter2:any  = filter1.filter((x:any) => x['program1'].includes(this.searchForm.value.searchEvent))
   this.events = filter1;
  }
  events:any;
  constructor(private homeService: HomeService, private cookies: CookieService,
    private toastServiceAlert: ToastServiceAlert,
    private loading2: NgxSpinnerService) { }
  event_id:any=null;

ngDoCheck() {
  let h = window.innerHeight
  console.log(h)
  console.log(this.h_screen)
      if(h != this.h_screen){
        this.h_screen = h
        this.heightscrolleventList()
      }
     
    
}

  ngOnInit(): void {
    this.h_screen = window.innerHeight
    this.platform = navigator.userAgent;
    if (this.platform.match(/Android/i)) {
      this.showMobile = true;
      this.isAndroid = true;
    }
    if (this.platform.match(/iPhone|iPad|iPod/i)) {
      this.showMobile = true;
      this.isIOS = true;
    }
    if (this.platform.includes('')) {
      this.showMobile = false;
    }
    if (this.platform.match('Mac')) {
      this.showMobile = true;
      this.isIOS = true;
    }
    if (this.platform.includes('Win')) {
      this.showMobile = false;
    }

   this.getEvents();
   this.heightscrolleventList();
  }
  heightscrolleventList()
  {    
    console.log('calculando')
      setTimeout(() => {          
        let h_headder:any = document.getElementById('headerdashboard')?.clientHeight
        let h_cardorders:any= document.getElementById('cardorders')?.clientHeight
        let h_bodyindex:any = window.innerHeight
        let w_bodyindex:any = window.innerWidth   
        let h_headerlistevents:any = document.getElementById('headerlistevents')?.clientHeight ; 
        let listevent:any = document.getElementById('listevents');
        if(this.showMobile){
          if(w_bodyindex > 1024){
            listevent.style.height =  (h_bodyindex - h_headder -h_headerlistevents - 30)+"px"; 
          }else{
            listevent.style.height =  (300)+"px"; 
          }
        }else{
          listevent.style.height =  (h_bodyindex - h_headder - h_headerlistevents - 30)+"px"; 
        }
      }, 1000);
  }


  getEvents():void{
    this.homeService.getEvents({'dbServer':this.cookies.get('dbServer')}).subscribe(
      (data:any)=>{
        this.eventdata = data
        this.events = data
    setTimeout(() => {          
      let h_headder:any = document.getElementById('headerdashboard')?.clientHeight
      let h_cardorders:any= document.getElementById('cardorders')?.clientHeight
      let h_nav:any = document.getElementById('sidebar')?.clientHeight
      let h_headerlistevents:any = document.getElementById('headerlistevents')?.clientHeight ; 
      let listevent:any = document.getElementById('listevents');
      listevent.style.height =  (h_nav - h_headder - h_cardorders -h_headerlistevents - 20)+"px"; 
    }, 1000);
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

      this.homeService.forceUpdate({'dbServer':this.cookies.get('dbServer')}).subscribe(
        (data:any)=>{
          console.log(data);
        }, err=>{
          console.log(err);
        });
        
      
    }else{
      this.toastServiceAlert.show("You are not connected to the internet", { classname:'fixed bottom-0 right-0 m-1', delay: 5000 });  
    }
  
  }


  orders(event_id:any){
    this.homeService.actionGoBack.emit('selectEvent');
    this.event_id = event_id;
    this.heightscrolleventList();

  
  }

}

import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastServiceAlert } from 'src/toastAlert.services';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.scss']
})
export class ListOrdersComponent implements OnInit, OnChanges {

  constructor(private homeService:HomeService, private cookie:CookieService,
    public toastServiceAlert: ToastServiceAlert,
    private loading: NgxSpinnerService) { }
  @Input() event_id = null;
  orders:any[] = [];
  ordersCloud:any[] = [];
  selectedAll:boolean = false;
  titleselecteAll:String = "Select All";
  selectedRowIds: Set<any> = new Set<any>();
  count:number= 0;
  active = 1;

  ngOnInit(): void {
   
  }




  
  ngOnChanges():void{
    this.getSalesOrders();
    this.count = 0; 
    this.titleselecteAll = "Select All";
 }

  getSalesOrders(){
    this.selectedRowIds = new Set<any>();
     this.homeService.getSalesOrdersLocal({"event_id":this.event_id, "dbServer":this.cookie.get('dbServer')}).subscribe((data:any)=>{     
      this.orders= data
    }, err =>{
      console.log(err)
    })

    this.homeService.getSalesOrdersCloud({"event_id":this.event_id, "dbServer":this.cookie.get('dbServer')}).subscribe((data:any)=>{     
      this.ordersCloud= data
    }, err =>{
      console.log(err)
    })
  }

  refreshSalesOrders(){
    this.getSalesOrders(); 
  }




  onAllRowClick(){
    if(this.selectedAll == false){
      for (var val of this.orders) {
          this.selectedRowIds.add(val.SOID); 
      }
      this.selectedAll = true;
      this.titleselecteAll = "Deselect";
    }else{
      for (var val of this.orders) {
        this.selectedRowIds.delete(val.SOID); 
      }
      this.selectedAll = false;
      this.titleselecteAll = "Select All";
    }
    this.countItemSelected();    
  }
  resetItemSelected(){
    for (var val of this.orders) {
      this.selectedRowIds.delete(val.SOID); 
    }
    this.selectedAll = false;
    this.titleselecteAll = "Select All";
    this.count = 0;
  }
  onRowClick(id: any) {
    if(this.selectedRowIds.has(id)) {
     this.selectedRowIds.delete(id);
     this.titleselecteAll = "Select All";
     this.selectedAll = false;
    }
    else {
      this.selectedRowIds.add(id);
      
    var c = 0;
    for (var val of this.orders) {
      if(this.selectedRowIds.has(val.SOID)){
        var c = c +1;
      }    
    }
    if(c == this.orders.length){
        this.selectedAll = true;
        this.titleselecteAll = "Deselect";
      } 
    }

    this.countItemSelected();
  } 



  
  countItemSelected(){
    this.count = 0;
    for (var val of this.orders) {
      if(this.selectedRowIds.has(val.SOID)){
        this.count = this.count +1;
      }    
    } 
  }

  rowIsSelected(id: any) {
    return this.selectedRowIds.has(id);
  }


// upload sales orders
  onLogClick() {

    if(navigator.onLine){
      this.homeService.titleloading.emit('Upload Sales Orders');
      this.loading.show();      
      var json = {
        "dbServer":this.cookie.get('dbServer'),
        "orders":this.orders.filter(x => this.selectedRowIds.has(x.SOID))
      }
  
      this.homeService.UploadManyOrders(json).subscribe(
        (data:any)=>{console.log(data),
          this.resetItemSelected(),
          this.getSalesOrders(),
          this.loading.hide();
          this.toastServiceAlert.show(data, { classname: 'fixed bottom-0 right-0 m-1', delay: 5000 });        
        },
        (error:any)=>{console.log(error),         
          this.loading.hide();
        }
      );
    }else{
      this.toastServiceAlert.show("You are not connected to the internet", { cclassname: 'fixed bottom-0 right-0 m-1', delay: 5000  });  
    }

  }

  



}

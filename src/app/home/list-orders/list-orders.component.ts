import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.scss']
})
export class ListOrdersComponent implements OnInit, OnChanges {

  constructor(private homeService:HomeService, private cookie:CookieService) { }
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
          this.selectedRowIds.add(val.yy_SOID_tx); 
      }
      this.selectedAll = true;
      this.titleselecteAll = "Deselect";
    }else{
      for (var val of this.orders) {
        this.selectedRowIds.delete(val.yy_SOID_tx); 
      }
      this.selectedAll = false;
      this.titleselecteAll = "Select All";
    }
    this.countItemSelected();    
  }

  resetItemSelected(){
    for (var val of this.orders) {
      this.selectedRowIds.delete(val.yy_SOID_tx); 
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
      if(this.selectedRowIds.has(val.yy_SOID_tx)){
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
      if(this.selectedRowIds.has(val.yy_SOID_tx)){
        this.count = this.count +1;
      }    
    } 
  }

  rowIsSelected(id: any) {
    return this.selectedRowIds.has(id);
  }



  onLogClick() {
    
   var json = {
    "dbServer":this.cookie.get('dbServer'),
    "orders":this.orders.filter(x => this.selectedRowIds.has(x.yy_SOID_tx))
  }
 
    this.homeService.UploadManyOrders(json).subscribe(
      (data:any)=>{console.log(data),
         this.resetItemSelected(),
        this.getSalesOrders()
       

      },
      (error:any)=>{console.log(error)}
      )
  }

  



}

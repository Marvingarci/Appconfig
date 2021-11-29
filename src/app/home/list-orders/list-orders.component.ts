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
  orders:any;
  ngOnInit(): void {
   
  }

  ngOnChanges():void{
    this.homeService.getSalesOrders({"event_id":this.event_id, "dbServer":this.cookie.get('dbServer')}).subscribe((data:any)=>{
      console.log(data)
      this.orders=data
    }, err =>{
      console.log(err)
    })
  }



}

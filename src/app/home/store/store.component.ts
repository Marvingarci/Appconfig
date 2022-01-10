import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  suppliers:any;
  constructor(private homeService: HomeService, private cookies: CookieService) { }
  sid:any=null;
  ngOnInit(): void {
   this.getSuppliers()
  }

  getSuppliers():void{
    this.homeService.getSuppliers({'dbServer':this.cookies.get('dbServer')}).subscribe(
      (data:any)=>{
        this.suppliers = data
        console.log(this.suppliers)
      }, err=>{
        console.log(err)
      }
    )
  }


  getStyles(sid:any){
    this.sid = sid;
  }
}

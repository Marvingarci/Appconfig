import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-styles-by-store',
  templateUrl: './styles-by-store.component.html',
  styleUrls: ['./styles-by-store.component.scss']
})
export class StylesByStoreComponent implements OnInit {

  constructor(private homeService:HomeService, private cookie:CookieService) { }
  @Input() sid = null;
  styles:any;
  ngOnInit(): void {
   
  }

  ngOnChanges():void{
    console.log(this.sid)
    this.homeService.getStylesBySID({"SID":this.sid, "dbServer":this.cookie.get('dbServer')}).subscribe((data:any)=>{
      console.log(data)
      this.styles=data
    }, err =>{
      console.log(err)
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styles: []
})
export class ListEventsComponent implements OnInit {

  events:any;
  constructor(private homeService: HomeService, private cookies: CookieService) { }

  ngOnInit(): void {
    this.homeService.getEvents({'dbServer':this.cookies.get('dbServer')}).subscribe(
      (data:any)=>{
        this.events = data
        console.log(this.events)
      }, err=>{
        console.log(err)
      }
    )
  }

}

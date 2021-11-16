import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

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
  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testnavbar',
  templateUrl: './testnavbar.component.html',
  styleUrls: ['./testnavbar.component.scss']
})
export class TestnavbarComponent implements OnInit {

  constructor() { 
  }

  change(){
    var miElto = document.getElementsByClassName("close")[0];
    if(miElto){
    miElto.className = "sidebar click"; 
    }else{
    var close = document.getElementsByClassName("click")[0];
    close.className = "sidebar close";
    }
  }
  ngOnInit(): void {
  }

}

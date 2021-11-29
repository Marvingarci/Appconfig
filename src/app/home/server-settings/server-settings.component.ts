import { Component, OnInit } from '@angular/core';
import { ServersettingsService } from './serversettings.service';

@Component({
  selector: 'app-server-settings',
  templateUrl: './server-settings.component.html',
  styleUrls: ['./server-settings.component.scss']
})
export class ServerSettingsComponent implements OnInit {

  details:any;

  constructor(private SvcServerSettings: ServersettingsService,) { }

  ngOnInit(): void {
    this.SvcServerSettings.getDetailsServer().subscribe(
      (data:any)=>{
        this.details = data
        console.log(this.details)
      }, error =>{
        console.log(error)
      }
    )
  }
 

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  url='http://localhost/Appconfig/Events.php';

  constructor(private http: HttpClient) { }

  getEvents(data:any) {
    return this.http.post(this.url,data);    
  }
}

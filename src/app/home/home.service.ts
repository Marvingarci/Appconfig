import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {


  constructor(private http: HttpClient) { }

  getEvents(data:any) {
    return this.http.post('http://localhost/Appconfig/Events.php',data);    
  }

  getSalesOrders(data:any) {
    return this.http.post('http://localhost/Appconfig/getOrders.php',data);    
  }

  
}

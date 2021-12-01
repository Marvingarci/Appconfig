import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {


  constructor(private http: HttpClient) { }

  getEvents(data:any) {
    return this.http.post('http://localhost/Appconfig/php/events/Events.php',data);    
  }

  getSalesOrders(data:any) {
    return this.http.post('http://localhost/Appconfig/php/events/getOrders.php',data);    
  }

  getSuppliers(data:any) {
    return this.http.post('http://localhost/Appconfig/php/events/getSuppliers.php',data);    
  }

  getStylesBySID(data:any) {
    return this.http.post('http://localhost/Appconfig/php/events/getStylesBySID.php',data);    
  }

  
}

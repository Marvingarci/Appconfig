import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {


  constructor(private http: HttpClient) { }

  getEvents(data:any) {
    return this.http.post('http://localhost:8000/api/events',data);    
  }

  getSalesOrdersLocal(data:any) {
    return this.http.post('http://localhost:8000/api/getOrdersLocal',data);    
  }

  getSalesOrdersCloud(data:any) {
    return this.http.post('http://localhost:8000/api/getOrdersCloud',data);    
  }
  UploadManyOrders(data:any) {
    return this.http.post('http://localhost:8000/api/UploadManyOrders',data);    
  }

  getSuppliers(data:any) {
    return this.http.post('http://localhost/Appconfig/php/events/getSuppliers.php',data);    
  }

  getStylesBySID(data:any) {
    return this.http.post('http://localhost/Appconfig/php/events/getStylesBySID.php',data);    
  }

  
}

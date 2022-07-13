import { HttpClient } from '@angular/common/http';
import { Injectable, Output,EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

 @Output() titleloading:EventEmitter<any> =  new EventEmitter();
 @Output() actionGoBack:EventEmitter<any> =  new EventEmitter();

  constructor(private http: HttpClient) { }




  getEvents(data:any) {
    return this.http.post(`${environment.apiUrl}/events`,data);    
  }
  downloadEvents(data:any) {
    return this.http.post(`${environment.apiUrl}/downloadEvents`,data);    
  }

  forceUpdate(dbserver:any){
    return this.http.post(`${environment.apiUrl}/forceupdate`,dbserver); 
  }

  getSalesOrdersLocal(data:any) {
    return this.http.post(`${environment.apiUrl}/getOrdersLocal`,data);    
  }

  getSalesOrdersCloud(data:any) {
    return this.http.post(`${environment.apiUrl}/getOrdersCloud`,data);    
  }
  UploadManyOrders(data:any) {
    return this.http.post(`${environment.apiUrl}/UploadManyOrders`,data);    
  }

  getSuppliers(data:any) {
    return this.http.post('http://localhost/Appconfig/php/events/getSuppliers.php',data);    
  }

  getStylesBySID(data:any) {
    return this.http.post('http://localhost/Appconfig/php/events/getStylesBySID.php',data);    
  }
 
  
}

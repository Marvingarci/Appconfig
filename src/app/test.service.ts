import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  url='http://localhost/';

  constructor(private http: HttpClient) { }



  post(articulo:any) {
    return this.http.post(`${this.url}DBTest`, JSON.stringify(articulo));    
  }
}

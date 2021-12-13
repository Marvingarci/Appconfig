import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  //url='http://localhost/Appconfig/php/login/login.php';
  url='http://10.0.10.165/Appconfig/php/login/login.php';
  urlip = 'http://localhost/Appconfig/php/ip/ip.php';
  headers:any;
  headers2:any;
  
  constructor(private http: HttpClient) { 
    this.headers = new Headers();
    this.headers.append('Access-Control-Allow-Headers', 'Content-Type');
    this.headers.append('Access-Control-Allow-Methods', 'GET, POST');
    this.headers.append('Access-Control-Allow-Origin', '*');

    this.headers2 = new HttpHeaders({
      //'Content-Type':  'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, GET',
      'Access-Control-Allow-Origin': '*'
    })
  }

  
  // headers.append('Access-Control-Allow-Headers', 'Content-Type');
  // headers.append('Access-Control-Allow-Methods', 'GET');
  // headers.append('Access-Control-Allow-Origin', '*');


  execphpLogin(data:any) {
    return this.http.post(`${environment.apiUrl}/login`,data);
    // return this.http.post(this.url, data, {headers: this.headers});    
  }

  getIpWireless(){
    return this.http.get(this.urlip);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url='http://localhost/Appconfig/php/login/login.php';

  constructor(private http: HttpClient) { }

  execphpLogin(data:any) {
    return this.http.post(this.url,data);    
  }
}

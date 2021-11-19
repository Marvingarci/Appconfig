import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  url='http://localhost/UpdatesAngular.php';

  constructor(private http: HttpClient) { }



  execphp() {
    return this.http.get(this.url);    
  }
}

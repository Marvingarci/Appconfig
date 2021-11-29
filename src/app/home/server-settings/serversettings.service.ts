import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServersettingsService {

  url='http://localhost/Appconfig/ServerSettings.php';
  
  constructor(private http: HttpClient) { }

  getDetailsServer() {
    return this.http.get(this.url);    
  }
}

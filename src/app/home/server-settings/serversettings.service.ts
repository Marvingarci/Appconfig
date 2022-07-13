import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServersettingsService {

  urlUpdateApps='http://localhost/UpdateAppsGitHub.php';
  
  constructor(private http: HttpClient) { }

  updateApp(typeUpdate:any){
    return this.http.post(`${environment.apiUrl}/updateApp`,typeUpdate);
  }

  getDetailsServer() {
    return this.http.get(`${environment.apiUrl}/getServerSetting`); 
  }

  updateServerAlias(newAlias:any) {
    return this.http.post(`${environment.apiUrl}/updateServerAlias`,newAlias);    
  }
  getVersions() {
    return this.http.get(`${environment.apiUrl}/getVersions`);    
  } 

  changeWifiPass(pass:any) {
    return this.http.post(`${environment.apiUrl}/changeWifiPass`,pass);   
  }
  changeRouterName(name:any) {
    return this.http.post(`${environment.apiUrl}/changeRouterName`,name);   
  } 
  
  getNameRouter() {
    return this.http.get(`${environment.apiUrl}/getNameRouter`);   
  }

}

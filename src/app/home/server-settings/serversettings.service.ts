import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServersettingsService {

  // urlGetServerSett='http://localhost/Appconfig/php/serverSettings/getServerSettings.php';
  // urlUpdateserverAlias='http://localhost/Appconfig/php/serverSettings/updateServerAlias.php';
  // urlGetVersions='http://localhost/Appconfig/php/serverSettings/getVersions.php';
  urlUpdateApps='http://localhost/UpdateAppsGitHub.php';
  urlip = 'http://localhost/Appconfig/php/ip/ip.php';
  
  constructor(private http: HttpClient) { }

  getDetailsServer() {
    return this.http.get(`${environment.apiUrl}/getServerSetting`); 
  }

  updateServerAlias(newAlias:any) {
    return this.http.post(`${environment.apiUrl}/updateServerAlias`,newAlias);    
  }
  getVersions() {
    return this.http.get(`${environment.apiUrl}/getVersions`);    
  }


  updateApp(typeUpdate:any){
    return this.http.post(this.urlUpdateApps,typeUpdate);  
  }
  
  getIpWireless(){
    return this.http.get(this.urlip);
  }
}

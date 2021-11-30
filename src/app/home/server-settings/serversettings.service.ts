import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServersettingsService {

  urlGetServerSett='http://localhost/Appconfig/getServerSettings.php';
  urlUpdateserverAlias='http://localhost/Appconfig/updateServerAlias.php';
  urlGetVersions='http://localhost/Appconfig/getVersions.php';
  urlUpdateApps='http://localhost/Appconfig/UpdateAppsGitHub.php';
  
  constructor(private http: HttpClient) { }

  getDetailsServer() {
    return this.http.get(this.urlGetServerSett);    
  }

  updateServerAlias(newAlias:any) {
    return this.http.post(this.urlUpdateserverAlias,newAlias);    
  }
  getVersions() {
    return this.http.get(this.urlGetVersions);    
  }

  updateApp(typeUpdate:any){
    return this.http.post(this.urlUpdateApps,typeUpdate);  
  }
}

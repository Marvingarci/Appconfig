import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { ToastServiceAlert } from 'src/toastAlert.services';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private cookieservices:CookieService, private router:Router,
    public toastServiceAlert:ToastServiceAlert){}
    
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const cookie = this.cookieservices.get('token');
        if(!cookie){
         this.router.navigate(['/']); 
         this.toastServiceAlert.show('Please Login', { classname: 'fixed bottom-0 right-0 m-1', delay: 5000 });
       }
        
        return true;
    }
  
}

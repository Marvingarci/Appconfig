import { Injectable } from '@angular/core';
import {  HttpRequest,  HttpHandler,  HttpEvent,  HttpInterceptor,  HttpErrorResponse} from '@angular/common/http';
import { Observable ,throwError} from 'rxjs';


import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { catchError, retry } from 'rxjs/internal/operators';
import { ToastServiceAlert } from 'src/toastAlert.services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class JwtinterceptorInterceptor implements HttpInterceptor {


  constructor(    private cookieservices: CookieService, private router:Router,
    public toastServiceAlert:ToastServiceAlert,
    private modalService: NgbModal ) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      const token =   this.cookieservices.get('token');
      let req =request;
  
      if(token){
        req = request.clone({
            setHeaders:{
              authorization: `Bearer ${token}`
            }
        });   
  }  
  
          return next.handle(req).pipe(
            catchError((err: HttpErrorResponse) => {
              console.log(err.status)
                  if(err.status == 401  ){ 
                      this.modalService.dismissAll();           
                      this.cookieservices.deleteAll();
                      this.router.navigate(['/']);                      
                      this.toastServiceAlert.show('Token is Expired,Sign in again', { classname: 'fixed bottom-0 right-0 m-1', delay: 5000 });                    
                  }

                  if(err.status == 404){ 
                      this.modalService.dismissAll(); 
                      this.cookieservices.deleteAll();
                      this.toastServiceAlert.show('Token is Invalid,Sign in again', { classname: ' fixed bottom-0 right-0 m-1', delay: 5000 });
                      this.router.navigate(['/']);
                  }
                              
                  if (err.status == 500) {
                    this.toastServiceAlert.show('Server connection error', { classname: ' fixed bottom-0 right-0 m-1', delay: 5000 });
                  }
                  
                  return throwError( err );
               })
          );
    }
}

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastsUpdateVersion } from 'src/toast-updateversion.component';
import { ToastsAlert } from 'src/toast-alert.component';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ServerSettingsComponent } from './home/server-settings/server-settings.component';
import { TestnavbarComponent } from './testnavbar/testnavbar.component';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { JwtinterceptorInterceptor } from './jwt/jwtinterceptor.interceptor';

// import { LoadingBarModule } from '@ngx-loading-bar/core';
// import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
// import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ServerSettingsComponent,
  
    ToastsUpdateVersion,
    ToastsAlert,
    TestnavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    FontAwesomeModule,   
    LoadingBarModule,
    LoadingBarRouterModule,
    LoadingBarHttpClientModule,
    // LoadingBarModule
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
        useClass: JwtinterceptorInterceptor,
        multi: true,
    }
  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

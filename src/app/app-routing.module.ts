import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TestnavbarComponent } from './testnavbar/testnavbar.component';

const routes: Routes = [
  {
    path:'home', loadChildren: ()=>import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'login', component: LoginComponent
  },{
    path: 'testnavbar', component: TestnavbarComponent
  },
  {
    path: '**', redirectTo: "login"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

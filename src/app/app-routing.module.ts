import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './jwt/guards/login.guard';
import { UserGuard } from './jwt/guards/user.guard';
import { LoginComponent } from './login/login.component';
import { TestnavbarComponent } from './testnavbar/testnavbar.component';

const routes: Routes = [
  {
    path:'home', loadChildren: ()=>import('./home/home.module').then(m => m.HomeModule),canActivate:[UserGuard], ///edit
  },
  {
    path: '', component: LoginComponent, canActivate:[LoginGuard]
  },{
    path: 'testnavbar', component: TestnavbarComponent
  },
  {
    path: '**', redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

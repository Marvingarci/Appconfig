import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';


 const routes: Routes = [
  {
      path:'', component: DashboardComponent,
        children:[
           //{path:'dashboard', component: DashboardComponent},
          // {path:'payment', component: PaymentComponent},
          // {path:'contract/:id/:corpId/:companyName', component: ContractComponent},
        ]
      }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

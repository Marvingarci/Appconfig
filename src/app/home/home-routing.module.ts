import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';


 const routes: Routes = [
  {
    path:'',
    children:[
      {path:'', component: DashboardComponent,
        children:[
          // {path:'location', component: LocationComponent},
          // {path:'payment', component: PaymentComponent},
          // {path:'contract/:id/:corpId/:companyName', component: ContractComponent},
        ]
      },
      {path:'**', redirectTo:""},
            {path:'**', redirectTo:""},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

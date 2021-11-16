import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListEventsComponent } from './list-events/list-events.component';


 const routes: Routes = [
  {
      path:'', component: DashboardComponent,
        children:[
           {path:'events', component: ListEventsComponent},
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

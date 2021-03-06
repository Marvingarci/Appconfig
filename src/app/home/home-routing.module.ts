import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListEventsComponent } from './list-events/list-events.component';
import { ServerSettingsComponent } from './server-settings/server-settings.component';
import { ListOrdersComponent } from './list-orders/list-orders.component';
import { WifiSettingsComponent } from './wifi-settings/wifi-settings.component';
import { StoreComponent } from './store/store.component';


 const routes: Routes = [
  {
      path:'', component: DashboardComponent,
        children:[
           {path:'events', component: ListEventsComponent},
           {path:'serverSettings', component: ServerSettingsComponent},
           {path:'wifiSettings', component: WifiSettingsComponent},
           {path:'store', component: StoreComponent},
           {path:'events', component: ListEventsComponent,
            children:[
            {path:'sales-orders', component: ListOrdersComponent}
          ]},
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


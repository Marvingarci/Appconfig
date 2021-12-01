import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListEventsComponent } from './list-events/list-events.component';
import { ServerSettingsComponent } from './server-settings/server-settings.component';
import { ListOrdersComponent } from './list-orders/list-orders.component';
import { WifiSettingsComponent } from './wifi-settings/wifi-settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreComponent } from './store/store.component';
import { StylesByStoreComponent } from './styles-by-store/styles-by-store.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ListEventsComponent,
    
    ListOrdersComponent,
    WifiSettingsComponent,
    StoreComponent,
    StylesByStoreComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
  ]
})
export class HomeModule { }

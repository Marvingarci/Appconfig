import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListEventsComponent } from './list-events/list-events.component';
import { ListOrdersComponent } from './list-orders/list-orders.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ListEventsComponent,
    ListOrdersComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }

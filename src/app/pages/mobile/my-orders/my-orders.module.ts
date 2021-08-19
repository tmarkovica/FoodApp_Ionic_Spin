import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyOrdersPageRoutingModule } from './my-orders-routing.module';

import { MyOrdersPage } from './my-orders.page';
import { MealComponent } from 'src/app/components/meal/meal.component';
import { DaysNavbarComponent } from 'src/app/mobile/components/days-navbar/days-navbar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyOrdersPageRoutingModule
  ],
  declarations: [MyOrdersPage, MealComponent, DaysNavbarComponent]
})
export class MyOrdersPageModule {}

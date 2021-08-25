import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyOrdersPageRoutingModule } from './my-orders-routing.module';

import { MyOrdersPage } from './my-orders.page';
import { MealComponent } from 'src/app/components/meal/meal.component';
import { DaysNavbarComponent } from 'src/app/mobile/components/days-navbar/days-navbar.component';
import { ComponentsMobileModule } from 'src/app/components/components-mobile/components-mobile.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyOrdersPageRoutingModule,
    ComponentsMobileModule
  ],
  declarations: [MyOrdersPage]
})
export class MyOrdersPageModule {}

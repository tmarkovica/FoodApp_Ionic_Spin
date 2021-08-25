import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestaurantPageRoutingModule } from './restaurant-routing.module';

import { RestaurantPage } from './restaurant.page';
import { DaysNavbarComponent } from 'src/app/mobile/components/days-navbar/days-navbar.component';
import { MealComponent } from 'src/app/components/meal/meal.component';
import { ComponentsMobileModule } from 'src/app/components/components-mobile/components-mobile.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestaurantPageRoutingModule,
    ComponentsMobileModule
  ],
  declarations: [RestaurantPage]
})
export class RestaurantPageModule {}

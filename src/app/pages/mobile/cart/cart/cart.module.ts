import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartPageRoutingModule } from './cart-routing.module';

import { CartPage } from './cart.page';
import { MealComponent } from 'src/app/components/meal/meal.component';
import { ComponentsModule } from 'src/app/components/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CartPage]
})
export class CartPageModule {}

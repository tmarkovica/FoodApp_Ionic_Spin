import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuPageRoutingModule } from './menu-routing.module';

import { MenuPage } from './menu.page';
import { DaysNavbarComponent } from 'src/app/components/days-navbar/days-navbar.component';
import { MealComponent } from 'src/app/components/meal/meal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPageRoutingModule,
  ],
  declarations: [MenuPage, MealComponent, DaysNavbarComponent],
})
export class MenuPageModule {}

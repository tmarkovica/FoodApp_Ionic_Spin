import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { MealComponent } from 'src/app/components/meal/meal.component';
import { DaysNavbarComponent } from 'src/app/components/days-navbar/days-navbar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule
  ],
  declarations: [DashboardPage, MealComponent, DaysNavbarComponent]
})
export class DashboardPageModule {}

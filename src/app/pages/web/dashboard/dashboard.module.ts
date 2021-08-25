import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { MealComponent } from 'src/app/components/meal/meal.component';
import { DaysNavbarComponent } from 'src/app/components/days-navbar/days-navbar.component';
import { ComponentsWebModule } from 'src/app/components/components-web/components-web.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    ComponentsWebModule
  ],
  declarations: [DashboardPage],
})
export class DashboardPageModule {}

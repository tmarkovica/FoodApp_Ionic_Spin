import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealComponent } from '../meal/meal.component';
import { DaysNavbarComponent } from '../days-navbar/days-navbar.component';

@NgModule({
  declarations: [DaysNavbarComponent, MealComponent],
  imports: [
    CommonModule
  ],
  exports: [
    DaysNavbarComponent,
    MealComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsWebModule { }

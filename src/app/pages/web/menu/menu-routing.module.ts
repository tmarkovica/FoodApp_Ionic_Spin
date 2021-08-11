import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';
import { MealComponent } from 'src/app/components/meal/meal.component';

const routes: Routes = [
  {
    path: '**',
    component: MenuPage
  },
  {
    path: 'new-meal',
    loadChildren: () => import('src/app/pages/web/new-meal/new-meal.module').then( m => m.NewMealPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}

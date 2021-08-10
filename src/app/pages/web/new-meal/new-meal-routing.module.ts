import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewMealPage } from './new-meal.page';

const routes: Routes = [
  {
    path: '**',
    component: NewMealPage
  },
  {
    path: 'menu',
    loadChildren: () => import('src/app/pages/web/menu/menu.module')
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewMealPageRoutingModule {}

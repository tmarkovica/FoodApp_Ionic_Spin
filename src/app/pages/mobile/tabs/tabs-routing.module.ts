import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard/dashboard.module').then( m => m.DashboardPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: 'cart',
        loadChildren: () => import('../cart/cart/cart.module').then( m => m.CartPageModule)
      },
      {
        path: 'restaurant',
        loadChildren: () => import('../restaurant/restaurant.module').then( m => m.RestaurantPageModule)
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}

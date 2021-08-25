import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';
import { RestaurauntResolverService } from './resolvers/rastaurauntResolver/restauraunt-resolver.service';

const routes: Routes = [
  {
    path: "web",
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/web/dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },
      {
        path: 'new-meal',
        loadChildren: () => import('./pages/web/new-meal/new-meal.module').then(m => m.NewMealPageModule)
      },
      {
        path: 'menu',
        loadChildren: () => import('./pages/web/menu/menu.module').then(m => m.MenuPageModule)
      }
    ],
    resolve: {
      restauraunt: RestaurauntResolverService
    },
    canActivate: [AuthGuard]
  },
  {
    path: "mobile",
    children: [
      {
        path: 'tabs',
        loadChildren: () => import('./pages/mobile/tabs/tabs.module').then(m => m.TabsPageModule)
      },
      {
        path: 'restaurant',
        loadChildren: () => import('./pages/mobile/restaurant/restaurant.module').then(m => m.RestaurantPageModule)
      },
      {
        path: 'my-orders',
        loadChildren: () => import('./pages/mobile/my-orders/my-orders.module').then(m => m.MyOrdersPageModule)
      }
    ],
    resolve: {
      restauraunt: RestaurauntResolverService
    },
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';
import { LoginPageModule } from './pages/login/login.module';
import { RestaurauntResolverService } from './resolvers/rastaurauntResolver/restauraunt-resolver.service';

const routes: Routes = [
  {
    path: "web",
    children:[
      /*{
        path: '**',
        loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
      },*/
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/web/dashboard/dashboard.module').then( m => m.DashboardPageModule)
      },
      {
        path: 'new-meal',
        loadChildren: () => import('./pages/web/new-meal/new-meal.module').then( m => m.NewMealPageModule)
      },
      {
        path: 'menu',
        loadChildren: () => import('./pages/web/menu/menu.module').then( m => m.MenuPageModule)
      }
    ],
    resolve: {
      restauraunt: RestaurauntResolverService
    },
    canActivate: [AuthGuard]
  },
  {
    path: '**',
      loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

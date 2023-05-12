import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard, unauthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'auth', canActivate: [unauthGuard], loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule) },
  { path: 'dashboard', canActivate: [authGuard], loadChildren: () => import('./dashboard/dashboard.module').then(mod => mod.DashboardModule) },
  { path: '**', redirectTo: '/auth', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

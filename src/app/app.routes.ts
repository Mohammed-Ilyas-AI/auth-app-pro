import { Routes } from '@angular/router';

import { AUTH_ROUTES } from './features/auth/auth.routes';

import { DashboardComponent } from './features/dashboard/dashboard.component';

import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [

  ...AUTH_ROUTES,

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo: 'login'
  }
];
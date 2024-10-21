import { Routes } from '@angular/router';
import { informationGuard } from './shared/guards/information.guard';

export const routes: Routes = [
  {
    path: 'configuration',
    loadComponent: () => import('./core/configuration/configuration.component').then((m) => m.ConfigurationComponent),
  },
  {
    path: 'selection',
    loadComponent: () => import('./core/selection/selection.component').then((m) => m.SelectionComponent),
    canActivate: [informationGuard]
  },
  {
    path: 'summary',
    loadComponent: () => import('./core/summary/summary.component').then((m) => m.SummaryComponent),
    canActivate: [informationGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'configuration'
  }
];

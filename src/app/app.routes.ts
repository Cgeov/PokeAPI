import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'configuration',
    loadComponent: () => import('./core/configuration/configuration.component').then((m) => m.ConfigurationComponent),
  },
  {
    path: 'selection',
    loadComponent: () => import('./core/selection/selection.component').then((m) => m.SelectionComponent),
  },
  {
    path: 'summary',
    loadComponent: () => import('./core/summary/summary.component').then((m) => m.SummaryComponent),
  },
];

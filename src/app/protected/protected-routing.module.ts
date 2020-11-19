import { RoleGuard } from './../core/guards/role.guard';
import { AuthGuard } from './../core/guards/auth.guard';
import { ProtectedComponent } from './protected.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'app',
    component: ProtectedComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'parameters',
        loadChildren: () => import('./parameters/parameters.module').then(m => m.ParametersModule),
        canActivate: [RoleGuard]
      },
      {
        path: 'planning',
        loadChildren: () => import('./planning/planning.module').then(m => m.PlanningModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'workday',
        loadChildren: () => import('./workday/workday.module').then(m => m.WorkdayModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }

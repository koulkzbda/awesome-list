import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardPomodoroProgressComponent } from './dashboard-pomodoro-progress/dashboard-pomodoro-progress.component';
import { DashboardTaskItemComponent } from './dashboard-task-item/dashboard-task-item.component';
import { DashboardWithWorkdayComponent } from './dashboard-with-workday/dashboard-with-workday.component';


@NgModule({
  declarations: [DashboardComponent, DashboardPomodoroProgressComponent, DashboardTaskItemComponent, DashboardWithWorkdayComponent],
  imports: [
    SharedModule,
    DashboardRoutingModule,
  ]
})
export class DashboardModule { }

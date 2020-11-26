import { WorkdaysService } from './../../../core/services/workdays.service';
import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Workday } from 'src/app/shared/models/workday';

@Component({
  selector: 'app-planning-workday-list',
  templateUrl: './planning-workday-list.component.html',
  styles: [
  ]
})
export class PlanningWorkdayListComponent implements OnInit {
  public workdays: Workday[];

  constructor(
    private authService: AuthService,
    private workdayService: WorkdaysService
  ) { }

  onWorkdayRemoved(workday: Workday): void {
    this.workdayService.remove(workday)
      .subscribe(_ => this.workdays = this.workdays.filter(el => el.id !== workday.id)
      );
  }

  ngOnInit(): void {
    const id: string = this.authService.currentUser.id;
    this.workdayService.getWorkdayByUser(id).subscribe(workdays => this.workdays = workdays);
  }

}

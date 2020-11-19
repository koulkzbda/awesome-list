import { WorkdaysService } from './../../../core/services/workdays.service';
import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Workday } from 'src/app/shared/models/workday';

@Component({
  selector: 'app-planning-workday-list',
  templateUrl: './planning-workday-list.component.html',
  styles: [
  ]
})
export class PlanningWorkdayListComponent implements OnInit {
  public workdays$: Observable<Workday[]>;
  public workdays: Workday[];

  constructor(
    private authService: AuthService,
    private workdayService: WorkdaysService
  ) { }

  onWorkdayRemoved(displayDate: string): void {
    this.workdays = this.workdays.filter(workday =>
      displayDate !== workday.displayDate
    );
    this.workdays$ = of(this.workdays);
  }

  ngOnInit(): void {
    const id: string = this.authService.currentUser.id;
    this.workdayService.getWorkdayByUser(id).subscribe(workdays => this.workdays = workdays);
  }

}

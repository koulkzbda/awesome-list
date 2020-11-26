import { Router } from '@angular/router';
import { Workday } from './../../../shared/models/workday';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-planning-workday-item',
  templateUrl: './planning-workday-item.component.html',
  styles: [
  ]
})
export class PlanningWorkdayItemComponent {

  @Input() workday: Workday;
  @Output() workdayRemoved = new EventEmitter<Workday>();

  constructor(private router: Router) { }

  removeWorkday(): void {
    this.workdayRemoved.emit(this.workday);
  }

  goToWorkday(workday: Workday): void {
    this.router.navigate(
      ['app/workday'],
      {
        queryParams: {
          date: workday.dueDate
        }
      }
    );
  }

}

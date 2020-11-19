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
  @Output() workdayRemoved = new EventEmitter<string>();

  constructor() { }

  removeWorkday(displayDate: string): void {
    this.workdayRemoved.emit(displayDate);
  }

}

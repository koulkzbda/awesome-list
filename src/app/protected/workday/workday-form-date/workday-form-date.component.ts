import { DateService } from './../../../core/services/date.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-workday-form-date',
  templateUrl: './workday-form-date.component.html',
  styles: [
  ]
})
export class WorkdayFormDateComponent implements OnInit {
  @Input() dueDate: FormControl;
  @Output() dateSelected = new EventEmitter<string>();

  constructor(private dateService: DateService) { }

  ngOnInit(): void {
  }

  selectDate(date: Date): void {
    if (date) {
      const displayDate: string = this.dateService.getDisplayDate(date);
      this.dateSelected.emit(displayDate);
    }
  }

}

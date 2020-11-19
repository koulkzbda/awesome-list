import { FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-workday-form-notes',
  templateUrl: './workday-form-notes.component.html',
  styles: [
  ]
})
export class WorkdayFormNotesComponent implements OnInit {
  @Input() notes: FormControl;

  constructor() { }

  ngOnInit(): void {
  }

}

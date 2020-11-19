import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-workday-form-tasks',
  templateUrl: './workday-form-tasks.component.html',
  styles: [
  ]
})
export class WorkdayFormTasksComponent implements OnInit {
  @Input() tasks: FormArray;
  @Input() workdayForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  createTaskForm(): FormGroup {
    return this.fb.group({
      title: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(150)
      ]],
      todo: [1, [
        Validators.required,
        Validators.min(1),
        Validators.max(5)
      ]],
      done: 0
    });
  }

  onAddedTask(): void {
    const taskGroup = this.createTaskForm();
    this.tasks.push(taskGroup);
  }

  removeTask(index: number): void {
    this.tasks.removeAt(index);
  }

}

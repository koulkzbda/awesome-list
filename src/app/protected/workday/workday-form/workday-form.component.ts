import { Workday } from './../../../shared/models/workday';
import { AuthService } from './../../../core/services/auth.service';
import { WorkdaysService } from './../../../core/services/workdays.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { NgbDateStructAdapter } from '@ng-bootstrap/ng-bootstrap/datepicker/adapters/ngb-date-adapter';

@Component({
  selector: 'app-workday-form',
  templateUrl: './workday-form.component.html',
  styles: [
  ]
})
export class WorkdayFormComponent implements OnInit {
  workdayId: string;
  workdayForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private workdaysService: WorkdaysService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.workdayId = '';
      this.workdayForm = this.createWorkdayForm();
      if (params.date) {
        const date: Date = new Date(+params.date);
        this.dueDate.setValue(date);
      }
    });
  }

  get dueDate(): AbstractControl { return this.workdayForm.get('dueDate'); }
  get notes(): AbstractControl { return this.workdayForm.get('notes'); }
  get tasks(): FormArray { return this.workdayForm.get('tasks') as FormArray; }

  createWorkdayForm(): FormGroup {
    return this.fb.group({
      dueDate: [null, [
        Validators.required
      ]],
      tasks: this.fb.array([], [
        Validators.required,
        Validators.maxLength(6)
      ]),
      notes: ['', [
        Validators.maxLength(1000)
      ]]
    });
  }

  submit(): void {
    const userId: string = this.authService.currentUser.id;

    if (this.workdayId) {
      let workday: Workday = new Workday({ ...{ id: this.workdayId }, ...this.workdayForm.value });
      workday.userId = userId;

      this.workdaysService.update(workday).subscribe(
        _ => this.router.navigate(['/app/planning']),
        _ => this.workdayForm.reset()
      );
      return;
    }

    let workday: Workday = new Workday({ ...this.workdayForm.value });
    workday.userId = userId;
    this.workdaysService.save(workday).subscribe(
      _ => {
        this.router.navigate(['/app/planning']);
      },
      _ => this.workdayForm.reset()
    );
  }

  resetWorkdayForm(): void {
    while (this.tasks.length !== 0) {
      this.tasks.removeAt(0);
    }
    this.notes.reset();
  }

  onDateSelected(displayDate: string): void {
    const userId: string = this.authService.currentUser.id;
    this.workdaysService.getWorkdayByDate(displayDate, userId).subscribe(workday => {
      this.resetWorkdayForm();
      if (!workday) { return; }

      this.workdayId = workday.id;
      this.notes.setValue(workday.notes);
      workday.tasks.forEach(task => {
        const taskField: FormGroup = this.fb.group({
          title: task.title,
          todo: task.todo,
          done: task.done
        });
        this.tasks.push(taskField);
      });
    });
  }
}

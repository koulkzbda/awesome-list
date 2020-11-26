import { AuthService } from './../../../core/services/auth.service';
import { WorkdaysService } from './../../../core/services/workdays.service';
import { Task } from './../../../shared/models/task';
import { map, takeUntil, delay, takeWhile } from 'rxjs/operators';
import { Workday } from './../../../shared/models/workday';
import { Component, OnInit, Input } from '@angular/core';
import { Subject, Observable, interval, of } from 'rxjs';

@Component({
  selector: 'app-dashboard-with-workday',
  templateUrl: './dashboard-with-workday.component.html',
  styleUrls: ['./dashboard-with-workday.component.scss']
})
export class DashboardWithWorkdayComponent implements OnInit {
  @Input() workday: Workday;
  isWorkdayComplete: boolean;
  isPomodoroActive: boolean;
  startPomodoro$: Subject<string>;
  cancelPomodoro$: Subject<string>;
  completePomodoro$: Subject<string>;
  currentProgress: number;
  maxProgress: number;
  pomodoro$: Observable<number>;
  constructor(private workdaysService: WorkdaysService, private authService: AuthService) { }

  ngOnInit(): void {
    this.isPomodoroActive = false;
    this.isWorkdayComplete = (this.currentTask === undefined);
    this.startPomodoro$ = new Subject();
    this.cancelPomodoro$ = new Subject();
    this.completePomodoro$ = new Subject();
    this.currentProgress = 0;
    this.maxProgress = this.authService.currentUser.pomodoroDuration;
    this.pomodoro$ = interval(1000).pipe(
      takeUntil(this.cancelPomodoro$),
      takeUntil(this.completePomodoro$),
      takeWhile(progress => progress <= this.maxProgress),
      map(x => x + 1)
    );
  }

  startPomodoro(): void {
    this.isPomodoroActive = true;
    this.startPomodoro$.next('start');

    this.pomodoro$.subscribe(currentProgress => {
      this.currentProgress = currentProgress;

      if (currentProgress === this.maxProgress) {
        of(0).pipe(delay(500)).subscribe(_ => this.completePomodoro());
      }
    });
  }

  cancelPomodoro(): void {
    this.isPomodoroActive = false;
    this.cancelPomodoro$.next('cancel');
  }

  completePomodoro(): void {
    this.isPomodoroActive = false;
    this.completePomodoro$.next('complete');
    this.currentTask.done++;
    this.isWorkdayComplete = (this.currentTask === undefined);
    this.workdaysService.update(this.workday).subscribe();
  }

  get currentTask(): Task | undefined {
    return this.workday.tasks.find(task => task.todo > task.done);
  }

}

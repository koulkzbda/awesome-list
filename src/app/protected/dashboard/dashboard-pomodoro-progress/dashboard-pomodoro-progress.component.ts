import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-pomodoro-progress',
  templateUrl: './dashboard-pomodoro-progress.component.html',
  styleUrls: ['./dashboard-pomodoro-progress.component.scss']
})
export class DashboardPomodoroProgressComponent implements OnInit {
  height = '1rem';
  currentProgress: number;
  percentage: number;

  constructor() { }

  @Input()
  set progress(progress: number) {
    this.currentProgress = progress;
    this.computePercentage();
  }

  @Input() maxProgress: number;

  ngOnInit(): void { }

  computePercentage(): void {
    if (!this.currentProgress || !this.maxProgress) {
      this.percentage = 0;
      return;
    }
    this.percentage = Math.floor(this.currentProgress / this.maxProgress * 100);
  }

}

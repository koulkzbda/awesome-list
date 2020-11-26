import { AuthService } from './../../../core/services/auth.service';
import { WorkdaysService } from './../../../core/services/workdays.service';
import { Workday } from './../../../shared/models/workday';
import { Observable } from 'rxjs';
import { User } from './../../../shared/models/user';
import { DateService } from './../../../core/services/date.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  currentDate: string;
  currentUser: User;
  workday$: Observable<Workday>;

  constructor(
    private dateService: DateService,
    private authService: AuthService,
    private workdaysService: WorkdaysService,
  ) { }

  ngOnInit(): void {
    this.currentDate = this.dateService.getDisplayDate(new Date());
    this.currentUser = this.authService.currentUser;
    this.workday$ = this.workdaysService.getWorkdayByDate(this.currentDate, this.currentUser.id);
  }

}

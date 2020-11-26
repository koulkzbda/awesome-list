import { Task } from './../../../shared/models/task';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-task-item',
  templateUrl: './dashboard-task-item.component.html',
  styleUrls: ['./dashboard-task-item.component.scss']
})
export class DashboardTaskItemComponent implements OnInit {

  @Input() task: Task;

  constructor() { }

  ngOnInit(): void {
  }

}

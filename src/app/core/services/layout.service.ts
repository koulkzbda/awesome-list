import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private isSidenavCollapsed: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public readonly isSidenavCollapsed$: Observable<boolean> = this.isSidenavCollapsed.asObservable();

  constructor() { }

  public toggleSidenav(): void {
    this.isSidenavCollapsed.next(!this.isSidenavCollapsed.value);
  }
}

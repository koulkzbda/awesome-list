import { Toastr } from './../../shared/models/toastr';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastrService {
  private toastr: BehaviorSubject<Toastr | null> = new BehaviorSubject(null);
  public readonly toastr$: Observable<Toastr | null> = this.toastr.asObservable();

  constructor() { }

  public showToastr(toastr: Toastr): void {
    timer(0, 3000).pipe(take(2)).subscribe(i => {
      if (i === 0) {
        this.toastr.next(toastr);
      } else {
        this.toastr.next(null);
      }
    });
  }

  public closeToastr(): void {
    this.toastr.next(null);
  }
}

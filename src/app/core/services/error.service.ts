import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { ToastrService } from './toastr.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private toastrService: ToastrService) { }

  public handleError(error: any): Observable<never> {
    this.toastrService.showToastr({
      category: 'danger',
      message: error.message
    });
    return throwError(error);
  }
}

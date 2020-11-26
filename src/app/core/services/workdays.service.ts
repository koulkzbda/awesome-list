import { DateService } from './date.service';
import { tap, catchError, finalize, switchMap } from 'rxjs/operators';
import { LoaderService } from './loader.service';
import { ErrorService } from './error.service';
import { ToastrService } from './toastr.service';
import { Task } from './../../shared/models/task';
import { Observable, of } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Workday } from './../../shared/models/workday';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkdaysService {

  constructor(
    private http: HttpClient,
    private toastrService: ToastrService,
    private errorService: ErrorService,
    private loaderService: LoaderService,
    private dateService: DateService
  ) { }

  public save(workday: Workday): Observable<Workday> {
    const url = `${environment.firebase.firestore.baseURL}/workdays?key=${environment.firebase.apiKey}`;
    const data = this.getWorkdayForFirestore(workday);
    this.loaderService.setLoading(true);

    return this.http.post<Workday>(url, data).pipe(
      tap(_ => this.toastrService.showToastr({
        category: 'success',
        message: 'Votre journée de travail a été enregistrée avec succès.'
      })),
      catchError(error => this.errorService.handleError(error)),
      finalize(() => this.loaderService.setLoading(false)));
  }

  public update(workday: Workday): Observable<Workday> {
    const url = `${environment.firebase.firestore.baseURL}/workdays/${workday.id}?key=${environment.firebase.apiKey}&currentDocument.exists=true`;
    const data = this.getWorkdayForFirestore(workday);

    return this.http.patch<Workday>(url, data).pipe(
      tap(_ => this.toastrService.showToastr({
        category: 'success',
        message: 'Votre journée de travail a été sauvegardée avec succès.'
      })),
      catchError(error => this.errorService.handleError(error)),
      finalize(() => this.loaderService.setLoading(false))
    );
  }

  public getWorkdayByDate(date: string, userId: string): Observable<Workday | null> {
    const url = `${environment.firebase.firestore.baseURL}:runQuery?key=${environment.firebase.apiKey}`;
    const data = this.getSructuredQuery(date, userId);

    return this.http.post<Workday>(url, data).pipe(
      switchMap((data: any) => {
        const document = data[0].document;
        if (!document) {
          return of(null);
        }
        return of(this.getWorkdayFromFirestore(document.name, document.fields));
      })
    );
  }

  public getWorkdayByUser(userId: string): Observable<Workday[] | null> {
    const url = `${environment.firebase.firestore.baseURL}:runQuery?key=${environment.firebase.apiKey}`;
    const data = this.getWorkdayByUserQuery(userId);

    return this.http.post<Workday[]>(url, data).pipe(
      switchMap((workdaysData: any) => {
        const workdays: Workday[] = [];
        workdaysData.forEach(data => {
          if (data && data.document) {
            const workday: Workday = this.getWorkdayFromFirestore(data.document.name, data.document.fields);
            workdays.push(workday);
          }
        })
        return of(workdays);
      }),
      catchError(error => this.errorService.handleError(error))
    );
  }

  public remove(workday: Workday): Observable<Workday | null> {
    const url = `${environment.firebase.firestore.baseURL}/workdays/${workday.id}?key=${environment.firebase.apiKey}`;

    return this.http.delete<Workday>(url).pipe(
      tap(_ => this.toastrService.showToastr({
        category: 'success',
        message: 'Votre journée de travail a été supprimée avec succès.'
      })),
      catchError(error => this.errorService.handleError(error)),
      finalize(() => this.loaderService.setLoading(false))
    );
  }

  private getWorkdayForFirestore(workday: Workday): any {

    if (typeof workday.dueDate === 'string') {
      workday.dueDate = +workday.dueDate;
    }
    const date: number = new Date(workday.dueDate).getTime();
    const displayDate: string = this.dateService.getDisplayDate(new Date(workday.dueDate));
    const tasksList: Object = this.getTaskListForFirestore(workday.tasks);

    return {
      fields: {
        dueDate: { integerValue: date },
        displayDate: { stringValue: displayDate },
        tasks: tasksList,
        notes: { stringValue: workday.notes },
        userId: { stringValue: workday.userId }
      }
    };
  }

  private getTaskListForFirestore(tasks: Task[]): any {
    const taskList = {
      arrayValue: {
        values: []
      }
    };

    tasks.forEach(task => {
      taskList.arrayValue.values.push(this.getTaskForFirestore(task))
    });

    return taskList;
  }

  private getTaskForFirestore(task: Task): any {
    return {
      mapValue: {
        fields: {
          title: { stringValue: task.title },
          todo: { integerValue: task.todo },
          done: { integerValue: task.done },
          completed: { booleanValue: false }
        }
      }
    };
  }

  private getSructuredQuery(date: string, userId: string): any {
    return {
      structuredQuery: {
        from: [{
          collectionId: 'workdays'
        }],
        where: {
          compositeFilter: {
            op: 'AND',
            filters: [
              {
                fieldFilter: {
                  field: { fieldPath: 'displayDate' },
                  op: 'EQUAL',
                  value: { stringValue: date }
                }
              },
              {
                fieldFilter: {
                  field: { fieldPath: 'userId' },
                  op: 'EQUAL',
                  value: { stringValue: userId }
                }
              }
            ]
          }
        },
        limit: 1
      }
    };
  }

  private getWorkdayFromFirestore(name, fields): Workday {
    const tasksList: Task[] = [];
    const workdayId: string = name.split('/')[6];

    fields.tasks.arrayValue.values.forEach(data => {
      const task: Task = new Task({
        completed: data.mapValue.fields.completed.booleanValue,
        done: data.mapValue.fields.done.integerValue,
        title: data.mapValue.fields.title.stringValue,
        todo: data.mapValue.fields.todo.integerValue
      });
      tasksList.push(task);
    });

    return new Workday({
      id: workdayId,
      userId: fields.userId.stringValue,
      notes: fields.notes.stringValue,
      displayDate: fields.displayDate.stringValue,
      dueDate: fields.dueDate.integerValue,
      tasks: tasksList
    });
  }

  private getWorkdayByUserQuery(userId: string): any {
    return {
      structuredQuery: {
        from: [{
          collectionId: 'workdays'
        }],
        where: {
          fieldFilter: {
            field: { fieldPath: 'userId' },
            op: 'EQUAL',
            value: { stringValue: userId }
          }
        },
        orderBy: [{
          field: {
            fieldPath: 'dueDate'
          },
          direction: 'DESCENDING'
        }]
      }
    };
  }
}

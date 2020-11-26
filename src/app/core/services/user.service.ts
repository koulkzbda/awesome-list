import { User } from './../../shared/models/user';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  public save(user: User): Observable<User | null> {
    const url =
      `${environment.firebase.firestore.baseURL}/users?key=
    ${environment.firebase.apiKey}&documentId=${user.id}`;

    const data = this.getDataForFirestore(user);

    return this.http.post(url, data).pipe(
      switchMap((data: any) => {
        return of(this.getUserFromFirestore(data.fields));
      })
    );
  }

  public get(userId: string): Observable<User | null> {
    const url =
      `${environment.firebase.firestore.baseURL}:runQuery?key=
      ${environment.firebase.apiKey}`;
    const data = this.getStructuredQuery(userId);

    return this.http.post(url, data).pipe(
      switchMap((data: any) => {
        return of(this.getUserFromFirestore(data[0].document.fields));
      })
    );
  }

  public update(user: User): Observable<User | null> {
    const url =
      `${environment.firebase.firestore.baseURL}/users/${user.id}?currentDocument.exists=true&key=
      ${environment.firebase.apiKey}`;

    const data = this.getDataForFirestore(user);

    return this.http.patch(url, data).pipe(
      switchMap((data: any) => {
        return of(this.getUserFromFirestore(data.fields));
      })
    );
  }

  private getUserFromFirestore(fields: any): User {
    return new User({
      id: fields.id.stringValue,
      email: fields.email.stringValue,
      pomodoroDuration: fields.pomodoroDuration.integerValue,
      name: fields.name.stringValue,
      avatar: fields.avatar.stringValue
    });
  }

  private getDataForFirestore(user: User): Object {
    return {
      fields: {
        id: { stringValue: user.id },
        email: { stringValue: user.email },
        name: { stringValue: user.name },
        avatar: { stringValue: user.avatar },
        pomodoroDuration: { integerValue: user.pomodoroDuration }
      }
    };
  }

  private getStructuredQuery(userId: string): Object {
    return {
      structuredQuery: {
        from: [{
          collectionId: 'users'
        }],
        where: {
          fieldFilter: {
            field: { fieldPath: 'id' },
            op: 'EQUAL',
            value: { stringValue: userId }
          }
        },
        limit: 1
      }
    };
  }
}

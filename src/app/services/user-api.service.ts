import { PoliciesComponent } from './../pages/policies/policies.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../models/user.interface';
import { LoginPayload } from './user.service';

export interface loginAuthentication {
  message: string; 
  user: User; 
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  constructor(private httpClient: HttpClient) {}

  login(body: LoginPayload): Observable<loginAuthentication> {
    return this.httpClient
      .post<loginAuthentication>('http://localhost:3000/api/user/login',  body)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err.error);
        })
      );
  }

  register(body: User): Observable<User> {
    return this.httpClient
      .post<User>('http://localhost:3000/api/user/signup', body)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err.error);
        })
      );
  }

  updateUserInfo(id: any, body: any): Observable<User> {
    return this.httpClient
      .put<any>('http://localhost:3000/api/user/userInfo/' + id, body)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err.error);
        })
      );
  }

  updateDriverLicense(id: any, body: any): Observable<User> {
    return this.httpClient
      .put<any>('http://localhost:3000/api/user/driverLicense/' + id, body)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err.error);
        })
      );
  }

  resetPassword(id: any, body: any): Observable<User> {
    return this.httpClient
      .put<any>('http://localhost:3000/api/user/resetPassword/' + id, body)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err.error);
        })
      );
  }
}

import { PoliciesComponent } from './../pages/policies/policies.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { LoginPayload } from './user.service';



@Injectable({
  providedIn: 'root'
})
export class UserApiService {

constructor(private httpClient: HttpClient) { }
//add user type
login(body: LoginPayload): Observable<any> {
  return this.httpClient
  .post<any>('http://localhost:3000/api/user/login', body )
  .pipe(
    catchError((err: HttpErrorResponse) => {
      return throwError(() => err.error);
    })
  );
}
}

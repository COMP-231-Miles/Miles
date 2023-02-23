import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, take, tap } from 'rxjs';
import { User } from '../models/user.interface';
import { loginAuthentication, UserApiService } from './user-api.service';

export type LoginPayload = {
  email: string;
  password: string;
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private token: string;
  private currentUserSource = new ReplaySubject<User | null>(1);
  currentUserSource$ = this.currentUserSource.asObservable();

  constructor(
    private userApiService: UserApiService,
    ) {}

  login(authData: LoginPayload): Observable<loginAuthentication> {
    return this.userApiService.login(authData).pipe(
      take(1),
      tap(res => {
        if (res && res.token) {
          localStorage.setItem('token', JSON.stringify(res.token));
          localStorage.setItem('user', JSON.stringify(res.user));
          this.currentUserSource.next(res.user);
        }
      })
    );
  }

  getToken() {
    return this.token;
  }

  logout(): void {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  setCurrentUser(user: User): void {
    this.currentUserSource.next(user);
  }

  register(payload: User): Observable<any> {
    return this.userApiService.register(payload);
  }

  updateUserInfo(id: any, payload: any): Observable<any> {
    return this.userApiService.updateUserInfo(id, payload);
  }

  updateDriverLicense(id: any, payload: any): Observable<any> {
    return this.userApiService.updateDriverLicense(id, payload);
  }

  resetPassword(id: any, payload: any): Observable<any> {
    return this.userApiService.resetPassword(id, payload);
  }
}

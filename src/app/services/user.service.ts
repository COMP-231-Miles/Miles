import { Injectable } from '@angular/core';
import { ReplaySubject, take, tap } from 'rxjs';
import { UserApiService } from './user-api.service';

export type LoginPayload = {
  email: string;
  password: string;
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private token: string;
  //Todo: update data type
  private currentUserSource = new ReplaySubject<any>(1);
  currentUserSource$ = this.currentUserSource.asObservable();

  constructor(private userApiService: UserApiService) {}

  login(authData: LoginPayload) {
    return this.userApiService.login(authData).pipe(
      take(1),
      tap(res => {
        if (res && res.token) {
          this.token = res.token;
          localStorage.setItem('user', JSON.stringify(res.user));
          this.currentUserSource.next(res.user);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  setCurrentUser(user: any): void {
    this.currentUserSource.next(user);
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { LoginPayload, UserService } from './../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  email: string;
  password: string;
  isLoggedIn: boolean;
  currentUser$: Observable<any>; //to-do: update any to user
  ngUnsubscribe = new Subject<void>();

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.currentUser$ = this.userService.currentUserSource$;
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  login(): void {
    const payload: LoginPayload = {
      email: this.email,
      password: this.password,
    };

    // this.userService.login(payload).pipe();
    this.userService.login(payload).pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(() => {});
  }

  logout(): void {
    this.userService.logout();
    this.router.navigateByUrl('/');
  }
}

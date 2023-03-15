import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, Subject, take, takeUntil } from 'rxjs';
import { User } from 'src/app/models/user.interface';
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
  currentUser$: Observable<User | null>;
  ngUnsubscribe = new Subject<void>();

  userTypeSubject = new BehaviorSubject<boolean>(false);
  userType$ = this.userTypeSubject.asObservable()

  user: any = [];

  constructor(
    private userService: UserService, 
    private router: Router,
    private toastr: ToastrService

    ) {}

  ngOnInit(): void {
    this.currentUser$ = this.userService.currentUserSource$;
    this.currentUser$.pipe(take(1)).subscribe((user) => {
      this.user = user;
      console.log(this.user)
      if (this.user?.userType === 'OWNER') {
        this.userTypeSubject.next(true);
      }
    });
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

    if (payload.email == null || payload.password == null) {
      this.toastr.error('Username or password is empty');
      return;
    }

    this.userService.login(payload).pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(user => {
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
    })
  }

  logout(): void {
    this.userService.logout();
    this.router.navigateByUrl('/');
  }
  
  navigateToRegister(): void {
    this.router.navigate(['sign-up'])
  }
}

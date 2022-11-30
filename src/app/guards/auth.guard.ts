import { UserService } from './../services/user.service';
import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private toastr: ToastrService
    ) {}

  canActivate(): Observable<boolean> {
    return this.userService.currentUserSource$.pipe(
      map(user => {
        if (user) {
          return true;
        } 
        this.toastr.error('Please login to book');
        return false;
      })
    );
  }
}
import { UserService } from './services/user.service';
import { UserApiService } from './services/user-api.service';
import { Component, OnInit } from '@angular/core';
import { TestService } from './services/test.service';

interface Dummy {
  id: number;
  title: string;
  content: string;
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.setCurrentUSer();
  }

  setCurrentUSer(): void {
    const user = localStorage.getItem('user');
    this.userService.setCurrentUser(user);
  }
}

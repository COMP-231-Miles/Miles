import { UserApiService } from './services/user-api.service';
import { Component } from '@angular/core';
import { TestService } from './services/test.service';

interface Dummy {
  id: number;
  title: string;
  content: string;
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title:string;
  dummy: any = {
    id: null,
    title: '',
    content: ''
  };
  id = '';
  constructor(private testService: TestService) {
    this.testService.getDummy();
  }

  addDummy() {
    this.testService.addDummy(this.dummy);
  }

  deleteDummy() {
    this.testService.deleteDummy(this.id);
  }
}

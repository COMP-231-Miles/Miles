/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MyReservationComponent } from './my-reservation.component';

describe('MyReservationComponent', () => {
  let component: MyReservationComponent;
  let fixture: ComponentFixture<MyReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

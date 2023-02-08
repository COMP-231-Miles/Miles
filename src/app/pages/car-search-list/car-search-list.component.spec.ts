import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarSearchListComponent } from './car-search-list.component';

describe('CarSearchListComponent', () => {
  let component: CarSearchListComponent;
  let fixture: ComponentFixture<CarSearchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarSearchListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarSearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

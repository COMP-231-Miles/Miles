import { CarService } from 'src/app/services/car.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take, filter } from 'rxjs';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss'],
})
export class CarListComponent implements OnInit {
  collection: any[] = [];
  page = 1;
  carList: any= [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private carService: CarService
  ) {}

  ngOnInit() {
    this.carService
      .getOwnersCars()
      .pipe(take(1))
      .subscribe(res => {
        //weird..
        const cars = JSON.parse(JSON.stringify(res));
        this.carList = cars.data;
        console.log(this.carList)
      });
    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }
  }

  handlePageChange(event: any): void {
    this.page = event;
  }

  goToAdd() {
    this.router.navigate(['/car-list/add'], { relativeTo: this.route });
  }

  deleteCar(id: string) {
    this.carList = this.carList.filter((car: any) => car._id !== id);
    this.carService.deleteCarById(id).pipe(take(1)).subscribe();
  }
}

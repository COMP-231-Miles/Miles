import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { CarService } from 'src/app/services/car.service';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-car-search-list',
  templateUrl: './car-search-list.component.html',
  styleUrls: ['./car-search-list.component.scss']
})
export class CarSearchListComponent implements OnInit {
  cars$: Observable<any[]>;
  filteredCars$: Observable<any[]>;
  dateFromToCheck: any;
  dateToToCheck: any;
  constructor(private route: ActivatedRoute, private carService: CarService, private reservationService: ReservationService) { 
    this.locationToCheck = this.route.snapshot.paramMap.get('location')?.replace('%20', ' ');
    this.dateFromToCheck = this.route.snapshot.paramMap.get('dateFrom');
    this.dateToToCheck = this.route.snapshot.paramMap.get('dateTo');    
  }

  ngOnInit(): void {
    this.filteredCars$ = this.carService.getCars2().pipe(
      map(res => res.data.filter((car: any) => car.isAvailable))
    );
  }

  locationToCheck: any;
  carByLocationList: any;
  areCars: boolean = false;
  carList: any = []

  getCars() {
    this.carService.getCars2().subscribe(res => {
      this.carList = res.data.filter((car: any) => car.isAvailable);
      this.getReservations();      
    });    
  }

  reservations: any = [];
  unavailableCars: any = [];
  getReservations() {
   this.reservationService.getReservations().subscribe(res => {
    //filter reservations by location
    this.reservations = res.data.filter((x: any) => x.location == this.locationToCheck);       

    //filter reservations by date
    const df = new Date(this.dateFromToCheck);
    const dt = new Date(this.dateToToCheck);

    this.reservations.forEach((r: any) => {
      const dfr = new Date(r.fromDate);
      const dtr = new Date(r.toDate);
      if(dt > dfr && dt < dtr && !this.reservations.includes(r.carID))
      {
        this.unavailableCars.push(r.carID);
      } else if(df > dfr && df < dtr && !this.reservations.includes(r.carID))
      {
        this.unavailableCars.push(r.carID);
      } else if(df < dfr && dt > dtr && !this.reservations.includes(r.carID))
      {
        this.unavailableCars.push(r.carID);
      } else if (df > dfr && dt < dtr && !this.reservations.includes(r.carID))
      {
        this.unavailableCars.push(r.carID);
      }      
    });
    console.log('Reservations');
    console.log(this.reservations);
    console.log('this.unavailableCars');
    console.log(this.unavailableCars);
    this.getAvailableCars();    
   });
  }

  availableCars: any = []
  getAvailableCars() {
    this.availableCars = this.carList;

    this.availableCars = this.availableCars.filter((val: any) => !this.unavailableCars.includes(val._id));
    console.log('this.availableCars');
    console.log(this.availableCars);

    if (this.availableCars.length > 0) {
      this.areCars = true; 
    } else {this.areCars = false; }
    
  }

  onFilterChange(event: any) {
    const [type, numOfPassenger] = event;
    const selectedType = type.filter((type: any) => type.checked)
    .map((type: any) => type.title)
    const selectedNumOfPassenger = numOfPassenger.filter((num: any) => num.checked)
    .map((num: any) => num.value);


    this.filteredCars$ = this.carService.getCars2().pipe(
      map((res: any) => res.data.filter((car: any) => car.isAvailable)),
      map(cars => {
        if (selectedType.length > 0) {
          cars = cars.filter((car: any) => selectedType.includes(car.type));
        }
        if (selectedNumOfPassenger.length > 0) {
          cars = cars.filter((car: any) => {
            return selectedNumOfPassenger.some((count: any) => {
              return car.passengers >= parseInt(count);
            });
          });
        }
        return cars;
      })
    );
  }
}

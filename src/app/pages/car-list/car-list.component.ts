import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs';
import { CarService } from 'src/app/services/car.service';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit {

  dateFromToCheck: any;
  dateToToCheck: any;
  constructor(private route: ActivatedRoute, private carService: CarService, private reservationService: ReservationService) { 
    this.locationToCheck = this.route.snapshot.paramMap.get('location')?.replace('%20', ' ');
    this.dateFromToCheck = this.route.snapshot.paramMap.get('dateFrom');
    this.dateToToCheck = this.route.snapshot.paramMap.get('dateTo');    
    this.getCars();    
  }

  ngOnInit(): void {
  }

  locationToCheck: any;
  carByLocationList: any;
  areCars: boolean = false;
  carList: any = []

  getCars() {
    this.carService.getCars2().subscribe(res => {
      this.carList = res.data.filter((x: any) => x.pickupLoc == this.locationToCheck);
      //filter reservations by location
      console.log('cars: ');
      console.log(this.carList);
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

}

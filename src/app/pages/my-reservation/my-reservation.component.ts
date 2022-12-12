import { Component, OnInit } from '@angular/core';
const MOCK_RESERVATION = {
  pickUp: '2022-12-27, 09:00 AM',
  dropOff: '2022-12-28, 09:00 AM',
  rentalLocation: '30 blue Ave, ON, Toronto',
  car: {
    name: 'Mazda 3',
    type: 'Sedan',
    passengers: 5,
    price: 42,
    luggage: 2,
    isAuto: true,
    ACsup: false,
    pickupLoc: 'Toronto',
    insurance: 513247,
    imageName:
      'https://crdms.images.consumerreports.org/c_lfill,w_470,q_auto,f_auto/prod/cars/chrome/white/2022MAC170001_1280_01',
    isAvailable: true,
  },
  driverName: 'Colin Yoon',
  estimatedTotal: 999,
};
@Component({
  selector: 'app-my-reservation',
  templateUrl: './my-reservation.component.html',
  styleUrls: ['./my-reservation.component.scss'],
})
export class MyReservationComponent implements OnInit {
  reservation: any;
  constructor() {}

  ngOnInit() {
    //get reservation from api
    this.reservation = MOCK_RESERVATION;
  }
}

import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { CarService } from 'src/app/services/car.service';
import { Reservation, ReservationService } from 'src/app/services/reservation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  carId: any;
  carSelected: any;
  isNext: boolean = false;

  paymentForm!: FormGroup;
  submitted = false;

  locationToCheck: any;
  dateFromToCheck: any;
  dateToToCheck: any;

  constructor(private route: ActivatedRoute, private carService: CarService, private userService: UserService,
    private formBuilder: FormBuilder, private router: Router, private reservationService: ReservationService) { 
    this.carId = this.route.snapshot.paramMap.get('car');   
    this.locationToCheck = this.route.snapshot.paramMap.get('location')?.replace('%20', ' ');
    this.dateFromToCheck = this.route.snapshot.paramMap.get('dateFrom');
    this.dateToToCheck = this.route.snapshot.paramMap.get('dateTo');    
    this.getCar();    
    this.getUser();
  }

  ngOnInit(): void {
    this.paymentForm = this.formBuilder.group({
      name: ['', Validators.required],
      card: ['', Validators.required],
      cvv: ['', Validators.required],
      month: ['', Validators.required],
      year: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  } 


  isUser: boolean = false;
  user: any = [];
  getUser() {
    this.userService.currentUserSource$.pipe(take(1)).subscribe((user) => {
      console.log('user', user);
      this.user = user;
      this.isUser = true;
    })
  }

  reservationNumber: any;
  onSubmit()
  {   
    /*this.submitted = true;

    if (this.paymentForm.invalid) {
      alert('Please, complete all the required fields before submitting.');
      return;
    } 

    console.warn(data);*/
    alert('Your payment has been successfully submitted.');
    const newReservation: Reservation = {
      userID: this.user._id,
      carID: this.carId,
      fromDate: this.dateFromToCheck,
      toDate: this.dateToToCheck,
      location: this.locationToCheck,
      price: this.price,
    };


    this.reservationService.createReservations(newReservation).subscribe((reservation) => {
      console.log(reservation);
      this.reservationNumber = reservation.postId;
      console.log('Reservation Number');
      console.log(this.reservationNumber);
      this.router.navigateByUrl('/invoice/'+this.carId+'/'+this.locationToCheck+'/'+this.dateFromToCheck+'/'+this.dateToToCheck+'/'+this.reservationNumber);
    });

    
  }

  isCar: boolean = false;
  getCar() {
    this.carService.getCarById(this.carId).subscribe(res => {
      this.carSelected = res.data;
      console.log('car: ');
      console.log(this.carSelected);
      this.totalPrice(this.dateFromToCheck, this.dateToToCheck);
      this.isCar = true;
    });    
  }  

  price: number = 0;
  totalPrice(df: string, dt: string) {
    const dateFrom = new Date(df);
    const dateTo = new Date(dt);
    const numDays = (dateTo.getTime() - dateFrom.getTime())/(1000*3600*24);
    this.price = this.carSelected.price*numDays;
  }

  


}

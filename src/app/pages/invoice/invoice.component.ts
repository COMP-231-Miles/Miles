import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { CarService } from 'src/app/services/car.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  carId: any;
  carSelected: any;

  locationToCheck: any;
  dateFromToCheck: any;
  dateToToCheck: any;
  reservationNum: any;

  constructor(private route: ActivatedRoute, private carService: CarService, private router: Router, private userService: UserService) { 
    this.carId = this.route.snapshot.paramMap.get('car');   
    this.locationToCheck = this.route.snapshot.paramMap.get('location')?.replace('%20', ' ');
    this.dateFromToCheck = this.route.snapshot.paramMap.get('dateFrom');
    this.dateToToCheck = this.route.snapshot.paramMap.get('dateTo');    
    this.reservationNum = this.route.snapshot.paramMap.get('reservation');  
    this.getCar(); 
    this.getUser();   
  }

  getCar() {
    this.carService.getCarById(this.carId).subscribe(res => {
      this.carSelected = res.data;
      console.log('car: ');
      console.log(this.carSelected);
      this.totalPrice(this.dateFromToCheck, this.dateToToCheck);
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

  ngOnInit(): void {
  }

  price: number = 0;
  totalPrice(df: string, dt: string) {
    const dateFrom = new Date(df);
    const dateTo = new Date(dt);
    const numDays = (dateTo.getTime() - dateFrom.getTime())/(1000*3600*24);
    this.price = this.carSelected.price*numDays;
  }

  print() {
    window.print();
}


}

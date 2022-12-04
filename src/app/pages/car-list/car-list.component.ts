import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit {

  constructor(private route: ActivatedRoute, private carService: CarService) { 
    this.locationToCheck = this.route.snapshot.paramMap.get('location')?.replace('%20', ' ');
    console.log(this.locationToCheck);    
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
      this.carList = res.data;
      console.log('cars: ');
      console.log(this.carList);
      this.addLocation(this.locationToCheck);
    });    
  }

  addLocation(loc: string) {
    this.carByLocationList = [];
    for (let index = 0; index < this.carList.length; index++) {
      if(this.carList[index].pickupLoc == loc) {
        this.carByLocationList.push(this.carList[index]);
      }      
    }
    if (this.carByLocationList.length > 0) {
      this.areCars = true; console.log('are Cars:' +this.areCars);
    } else {this.areCars = false; console.log('are Cars:' +this.areCars);}
  }

  carList: any = [
    {
      name: "Mazda 3",
      type: "Sedan",
      passengers: 5,
      price: 42,
      luggage: 2,
      isAuto: true,
      ACsup: false,
      pickupLoc: "Toronto",
      insurance: 513247,
      imageName:'https://crdms.images.consumerreports.org/c_lfill,w_470,q_auto,f_auto/prod/cars/chrome/white/2022MAC170001_1280_01',
      isAvailable: true
    },
    {
      name: "Ford Bronco Sport",
      type: "SUV",
      passengers: 5,
      price: 62,
      luggage: 4,
      isAuto: true,
      ACsup: false,
      pickupLoc: "New York",
      insurance: 782543,
      imageName:'https://tdrresearch.azureedge.net/photos/chrome/Expanded/White/2021FOS400001/2021FOS40000101.jpg',
      isAvailable: true
    },
    {
      name: "Ford Fiesta",
      type: "Sedan",
      passengers: 5,
      price: 38,
      luggage: 2,
      isAuto: true,
      ACsup: false,
      pickupLoc: "Toronto",
      insurance: 253849,
      imageName:'https://www.motortrend.com/uploads/sites/10/2018/10/2019-ford-fiesta-s-sedan-angular-front.png',
      isAvailable: true
    },
  ]

}

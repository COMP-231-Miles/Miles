import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  carId: any;
  carSelected: any;

  constructor(private route: ActivatedRoute, private carService: CarService) { 
    this.carId = this.route.snapshot.paramMap.get('car');   
    this.getCar();
  }

  ngOnInit(): void {
  } 

  getCar() {
    this.carService.getCarById(this.carId).subscribe(res => {
      this.carSelected = res;
      console.log('car: ');
      console.log(this.carSelected);
    });    
  }

  


}

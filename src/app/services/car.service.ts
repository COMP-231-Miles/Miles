import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private httpClient: HttpClient) { }
  //add user type
  cars: any = [];
  getCars(): void {
    this.httpClient.get<any>('http://localhost:3000/api/car')
    .pipe(map((res) => {
      return res.data.map((item: any) => {
        return {
          name: item.name,
          type: item.type,
          passengers: item.passengers,
          price: item.price,
          luggage: item.luggage,
          pickupLoc: item.pickupLoc,
          insurance: item.insurance,
          imageName: item.imageName,
          isAvailable: item.isAvailable
        }
      })
    }))
    .subscribe((res) => {
      //console.log('res', res);
      this.cars = res;
    })

    return this.cars;
  }

  getCars2 () {
    return this.httpClient.get<any>('http://localhost:3000/api/car');
  }
}

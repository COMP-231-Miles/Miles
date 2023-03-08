import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private token: any;
  private user: any;

  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    ) { 
      this.token = localStorage.getItem('token');

    }
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

  getCarById(id:string) {
    return this.httpClient.get<any>('http://localhost:3000/api/car/'+id);
  }

  deleteCarById(id: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.token )
    return this.httpClient.delete<any>(`http://localhost:3000/api/car/delete/${id}`, { headers: headers });
  }

  addCar(body: any) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.token )
    return this.httpClient.post<any>('http://localhost:3000/api/car', body, { headers: headers }).subscribe();
  }

  getOwnersCars() {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.token )
    return this.httpClient.get<any>('http://localhost:3000/api/car/owner', { headers: headers });
  }
}

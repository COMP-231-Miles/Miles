import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private token: any;
  private user: any;

  constructor(
    private httpClient: HttpClient,
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
          imageName: item.imageName,
          isAvailable: item.isAvailable
        }
      })
    }))
    .subscribe((res) => {
      this.cars = res;
    })

    return this.cars;
  }

  getCars2 () {
    return this.httpClient.get<any>('http://localhost:3000/api/searchCar');
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

  updateCar(id:string, body: any) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.token )
    return this.httpClient
    .put<any>('http://localhost:3000/api/car/' + id, body, { headers: headers }).subscribe();
  }
}

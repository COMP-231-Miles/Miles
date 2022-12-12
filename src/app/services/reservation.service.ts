import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

export type Reservation = {
  userID : String,
  carID : String,
  fromDate : Date,
  toDate : Date,
  location: String,
  price: Number,
};
@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private httpClient: HttpClient) { }

  getReservations(): Observable<any> {
    return this.httpClient.get<any>('http://localhost:3000/api/reservation');
  }

  createReservations(body: Reservation): Observable<any> {
    return this.httpClient.post<any>('http://localhost:3000/api/reservation', body)
    .pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(() => err.error);
      })
    );
  }
}

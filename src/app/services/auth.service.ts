import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({
  providedIn:'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // //example login logic 
  // login(email: string, password: string) {
  //   const authData = {
  //     email: email,
  //     password: password
  //   }
  //   this.http.post('http://localhost:3000/api/user/login', authData).subscribe(res => {
  //     console.log(res);
  //     //we may want to save token in localStorage
  //   })
  // }
}
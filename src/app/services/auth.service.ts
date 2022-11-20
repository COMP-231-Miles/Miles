import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({
  providedIn:'root'
})
export class AuthService {
  private token: string;
  constructor(private http: HttpClient) {}

  //example login logic 
  login(email: string, password: string) {
    const authData = {
      email: email,
      password: password
    }
    this.http.post<{token:string}>('http://localhost:3000/api/user/login', authData).subscribe(res => {
      console.log(res);
      const token = res.token;
      this.token = token;
    })
  }

  getToken() {
    return this.token;
  }
}
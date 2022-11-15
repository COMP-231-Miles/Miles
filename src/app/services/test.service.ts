import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

@Injectable({
  providedIn:'root'
})
export class TestService {
  constructor(private httpClient: HttpClient) {}

  getDummy(): void {
    this.httpClient.get<any>('http://localhost:3000/api/posts')
    .pipe(map((res) => {
      return res.data.map((item: any) => {
        return {
          id: item._id,
          title: item.title,
          content: item.content
        }
      })
    }))
    .subscribe((res) => {
      console.log('res', res);
    })
  }

  addDummy(param: any): void {
    this.httpClient.post<any>('http://localhost:3000/api/posts', param).subscribe((res) => {
      console.log('res', res);
    });
  }

  deleteDummy(id: string) {
    this.httpClient.delete('http://localhost:3000/api/posts/' + id)
      .subscribe(() => {
        console.log('Deleted!');
      })
  }
}
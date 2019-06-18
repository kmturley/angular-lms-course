import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  data = {};

  constructor(
    private http: HttpClient
  ) {}

  get(url, id): Observable<any> {
    if (this.data[url]) {
      return of(this.data[url]);
    } else {
      return this.http.get(url).pipe(
        map((data) => {
          this.data[url] = data[id];
          return this.data[url];
        })
      );
    }
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  data = {
    pages: []
  };

  constructor(
    private http: HttpClient
  ) {}

  get(url, id): Observable<any> {
    if (this.data[id].length) {
      return of(this.data[id]);
    } else {
      console.log('ApiService.get', url, id);
      return this.http.get(url).pipe(
        map((data) => {
          this.data[id] = data[id];
          return this.data[id];
        })
      );
    }
  }
}

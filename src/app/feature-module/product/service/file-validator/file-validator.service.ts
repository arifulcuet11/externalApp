import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileValidatorService {
  routePrefix = '/api/fileValidator';
  constructor(private http: HttpClient) { }

  getById(id: number): Observable<any> {
    return this.http.get(this.routePrefix + '/get/' + id);
  }

  gets(): Observable<any> {
    return this.http.get(this.routePrefix + '/gets');
  }

  getsActive(): Observable<any> {
    return this.http.get(this.routePrefix + '/actives');
  }

  add(data): Observable<any> {
    return this.http.post(this.routePrefix + '/add', data);
  }

  edit(id: number, data): Observable<any> {
    return this.http.put(this.routePrefix + '/edit/' + id, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.routePrefix + '/delete/' + id);
  }
  getByValidatorType(id: number): Observable<any> {
    return this.http.get(this.routePrefix + '/getByValidatorType/' + id);
  }

}

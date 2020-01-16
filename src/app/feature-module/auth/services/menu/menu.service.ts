import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Options } from 'selenium-webdriver/ie';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  routePrefix = '/api/menu';
  constructor(private http: HttpClient) { }

  getById(id: number): Observable<any>{
    return this.http.get(this.routePrefix + '/get/'+ id);
  }

  gets(): Observable<any>{
    return this.http.get(this.routePrefix + '/gets');
  }

  add(data): Observable<any>{
    return this.http.post(this.routePrefix + '/add', data);
  }

  edit(id: number, data): Observable<any>{
    
    return this.http.put(this.routePrefix + '/edit/'+ id, data);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(this.routePrefix + '/delete/' + id);
  }
}

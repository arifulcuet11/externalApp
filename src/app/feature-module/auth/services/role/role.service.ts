import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  routePrefix = '/api/role';
  constructor(private http: HttpClient) { }

  getById(id: number): Observable<any>{
    return this.http.get(this.routePrefix + '/get/'+ id);
  }

  gets(): Observable<any>{
    return this.http.get(this.routePrefix + '/gets');
  }

  getActives(): Observable<any>{
    return this.http.get(this.routePrefix + '/actives');
  }

  add(data): Observable<any>{
    return this.http.post(this.routePrefix + '/add', data);
  }

  edit(id: number, data): Observable<any>{
    return this.http.put(this.routePrefix + '/update/'+ id, data);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(this.routePrefix + '/delete/' + id);
  }
}

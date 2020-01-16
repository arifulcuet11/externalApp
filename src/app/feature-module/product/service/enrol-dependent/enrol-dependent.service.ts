import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pagination, buildPaginationUrl } from 'src/app/utility/services/paging/paging';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class EnrolDependentService {

  routePrefix = '/api/enrol/dependent';

  constructor(private http: HttpClient) { }

  getByEnrolId(id: number): Observable<any> {
    return this.http.get(this.routePrefix + '/enrol/' + id);
  }

  getById(id: number): Observable<any> {
    return this.http.get(this.routePrefix + '/get/' + id);
  }

  gets(enrolId: number, pagination: Pagination): Observable<any> {
    return this.http.get(buildPaginationUrl(this.routePrefix, '/' + enrolId + '/page', pagination));
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

  getGroupPolicyProd(id: number): Observable<any> {
    return this.http.get(this.routePrefix + '/gproduct/' + id);
  }
}

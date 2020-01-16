import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { buildPaginationUrl, Pagination } from 'src/app/utility/services/paging/paging';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnrolService {

  routePrefix = '/api/enrol';

  constructor(private http: HttpClient) { }

  getById(id: number): Observable<any> {
    return this.http.get(this.routePrefix + '/get/' + id);
  }

  getByPolicyId(id: number): Observable<any> {
    return this.http.get(this.routePrefix + '/grouppolicy/' + id);
  }

  gets(groupPolicyId: number, pagination: Pagination): Observable<any> {
    return this.http.get(buildPaginationUrl(this.routePrefix, '/grouppolicy/' + groupPolicyId + '/page', pagination));
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

  report(): any {
    return this.http.get(this.routePrefix + '/report', { responseType: 'blob' })
      .pipe(
        map((result: any) => {
          return result;
        })
      );
  }

}

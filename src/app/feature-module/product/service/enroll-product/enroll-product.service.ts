import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from 'src/app/utility/services/common/common-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnrollProductService extends CommonService {

  constructor(http: HttpClient) {
    super('/api/enrolProduct', http);
  }

  adds(data: any): Observable<any> {
    return this.http.post(this.routePrefix + '/adds', data);
  }

  delete(data: any): Observable<any> {
    return this.http.delete(this.routePrefix + '/delete/' + data.enrolId + '/' + data.groupPolicyClusterProductId);
  }

  deletes(data: any): Observable<any> {
    return this.http.post(this.routePrefix + '/deletes/', data);
  }
}

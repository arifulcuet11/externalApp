import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/app/utility/services/common/common-service.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentMapperService extends CommonService {

  constructor(http: HttpClient) {
    super('/api/componentMapper', http);
  }

  getByCode(code: string): Observable<any> {
    return this.http.get(this.routePrefix + '/getByCode/' + 'METIBC' + code);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from 'src/app/utility/services/common/common-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAdjudicatorLimitConfigService extends CommonService {

  constructor(http: HttpClient) {
    super('/api/userAdjudicatorLimitConfig', http);
   }

   getByUserId(userId: number): Observable<any> {
     return this.http.get(this.routePrefix + '/getByUserId/' + userId);
   }
}

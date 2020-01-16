import { Injectable } from '@angular/core';
import { CommonService } from 'src/app/utility/services/common/common-service.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnrolPaymentCycleLogService extends CommonService {

  constructor(public http: HttpClient) {
    super("/api/enrol-payment-cycle-log", http);
  }
  getsByEnrolId(enrolId: number): Observable<any> {
    return this.http.get(this.routePrefix + "/getByEnrolId/" + enrolId);
  }
}

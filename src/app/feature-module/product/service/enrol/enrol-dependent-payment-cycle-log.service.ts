import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/app/utility/services/common/common-service.service';

@Injectable({
  providedIn: 'root'
})
export class EnrolDependentPaymentCycleLogService extends CommonService {
  constructor(public http: HttpClient) {
    super("/api/enrol-dependent-payment-cycle-log", http);
  }
  getsByEnrolId(enrolDependentId: number): Observable<any> {
    return this.http.get(this.routePrefix + "/getByEnrolDependentId/" + enrolDependentId);
  }
}

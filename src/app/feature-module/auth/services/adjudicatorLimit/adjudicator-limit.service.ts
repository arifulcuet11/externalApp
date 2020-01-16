import { Injectable } from '@angular/core';
import { CommonService } from 'src/app/utility/services/common/common-service.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdjudicatorLimitService extends CommonService {

  constructor(http: HttpClient) { 
    super('/api/adjudicatorLimit', http);
  }


}

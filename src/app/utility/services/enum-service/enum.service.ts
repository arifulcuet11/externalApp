import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class EnumService {
  routePrefix = "/api/enums";
  constructor(private http: HttpClient) {}

  getClaimConfigType(): Observable<any> {
    return this.http.get(this.routePrefix + "/getClaimConfigType/");
  }

  getBenifitConfigType(): Observable<any> {
    return this.http.get(this.routePrefix + "/getBenifitConfigType");
  }

  getDateIndicator(): Observable<any> {
    return this.http.get(this.routePrefix + "/getDateIndicator");
  }

  getRatingType(): Observable<any> {
    return this.http.get(this.routePrefix + "/getRatingType");
  }

  getRatingAgree(): Observable<any> {
    return this.http.get(this.routePrefix + "/getRatingAgree");
  }

  getReinsuranceType(): Observable<any> {
    return this.http.get(this.routePrefix + "/getReinsuranceType");
  }

  getValidatorType(): Observable<any> {
    return this.http.get(this.routePrefix + "/getValidatorType");
  }

  getValidatorKey(): Observable<any> {
    return this.http.get(this.routePrefix + "/getValidatorKey");
  }

  getClaimPayTo(): Observable<any> {
    return this.http.get(this.routePrefix + "/getClaimPayTo");
  }

  getClaimStatus(): Observable<any> {
    return this.http.get(this.routePrefix + "/getClaimStatus");
  }

  getClaimAcknowledgeStauts(): Observable<any> {
    return this.http.get(this.routePrefix + "/getClaimAcknowledgeStauts");
  }

  getClaimFaultStatus(): Observable<any> {
    return this.http.get(this.routePrefix + "/getClaimFaultStatus");
  }

  getModelOfDeliveries(){
    return this.http.get(this.routePrefix + '/getModelOfDeliveries');
  }

  getMedicineType(){
    return this.http.get(this.routePrefix + '/getMedicineType');
  }

  getRoomTypes(){
    return this.http.get(this.routePrefix + '/getRoomTypes');
  }

  getConsultationTypes(){
    return this.http.get(this.routePrefix + '/getConsultationTypes');
  }

  getMaternityDeliveryTypes(): Observable<any> {
    return this.http.get(this.routePrefix + '/getMaternityDeliveryTypes');
  }
}

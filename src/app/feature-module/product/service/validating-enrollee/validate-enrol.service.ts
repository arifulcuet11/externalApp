import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Options } from 'selenium-webdriver/safari';
import { buildPaginationUrl, Pagination } from 'src/app/utility/services/paging/paging';

@Injectable({
  providedIn: 'root'
})
export class ValidateEnrolService {


  routePrefix = '/api/GCSubmission';
  constructor(private http: HttpClient) { }

  getById(id: number): Observable<any> {
    return this.http.get(this.routePrefix + '/get/' + id);
  }

  gets(): Observable<any> {
    return this.http.get(this.routePrefix + '/gets');
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
  findClaim(groupPolicyNo: string, birthYear: number, certificateNo: string): Observable<any> {

    const param = new HttpParams().
      set('groupPolicyNo', groupPolicyNo.toString()).
      set('birthYear', birthYear.toString()).
      set('certificateNo', certificateNo);

    return this.http.get(this.routePrefix + '/findClaim', { params: param });
  }
  otpValidation(otp: string, enrolId: number): Observable<any> {

    const param = new HttpParams().
      set('otp', otp).
      set('enrolId', enrolId.toString());

    return this.http.get(this.routePrefix + '/otp', { params: param });
  }

  getClaimDocuments(productId: number, securityToken: string): Observable<any> {
    const param = new HttpParams().
      set('productId', productId.toString())
      .set('securityToken', securityToken);
    return this.http.get(this.routePrefix + '/document', {params: param});
  }

  getByIdCustom(id: number): Observable<any> {
    return this.http.get(this.routePrefix + '/getByIdCustom/' + id);
  }

  getByClaimStatus(id: number): Observable<any> {
    return this.http.get(this.routePrefix + '/getByClaimStatus/' + id);
  }
  getByClaimStatusWithPagination(pagination: Pagination): Observable<any> {
    return this.http.post(this.routePrefix + '/getByClaimStatusWithPagination', pagination);
  }

  approve(data: any): Observable<any> {
    return this.http.post(this.routePrefix + '/approve', data);
  }
  approveMultiple(data: any[]): Observable<any> {
    return this.http.post(this.routePrefix + '/approveMultiple', data);
  }

  reject(data: any): Observable<any> {
    return this.http.post(this.routePrefix + '/reject', data);
  }

  rejectMultiple(data: any[]): Observable<any> {
    return this.http.post(this.routePrefix + '/rejectMultiple', data);
  }

}

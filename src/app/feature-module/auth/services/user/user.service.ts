import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { NavigateService } from "src/app/utility/services/navigate/navigate.service";
import {
  Pagination,
  buildPaginationUrl
} from "src/app/utility/services/paging/paging";

@Injectable({
  providedIn: "root"
})
export class UserService {
  routePrefix = "/api/accounts";

  constructor(private http: HttpClient, private navigate: NavigateService) {}

  gets(): Observable<any> {
    return this.http.get(this.routePrefix + "/gets");
  }

  getById(id: number): Observable<any> {
    return this.http.get(this.routePrefix + "/getById" + "/" + id);
  }

  getUserWithPagination(pagination: Pagination): Observable<any> {
    return this.http.get(
      buildPaginationUrl(this.routePrefix, "/page", pagination)
    );
  }

  edit(id: number, data, roles: any[]): Observable<any> {
    data.roles = roles;
    return this.http.put(this.routePrefix + "/edit/" + id, data);
  }

  changePassword(data): Observable<any> {
    return this.http.put(this.routePrefix + "/changePassword/", data);
  }

  resetPassword(data): Observable<any> {
    return this.http.post(this.routePrefix + "/passwordResetByOTP/", data);
  }
  sendResetPasswordOTP(email: string): Observable<any> {
    const obj = { email: email };
    return this.http.post(this.routePrefix + "/sendResetPasswordOTP/", obj);
  }

  getDataEntryUser(): Observable<any> {
    return this.http.get(this.routePrefix + "/getDataEntryUser");
  }

  getMedicalAdvisorUser(): Observable<any> {
    return this.http.get(this.routePrefix + "/getMedicalAdvisorUser");
  }

  getAllEBUser(): Observable<any> {
    return this.http.get(this.routePrefix + "/getDataEntryUser");
  }
}

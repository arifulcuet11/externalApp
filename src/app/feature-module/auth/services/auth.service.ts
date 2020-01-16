import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { StorageService } from 'src/app/utility/services/storage/storage.service';
import * as moment from 'moment';
import { NavigateService } from 'src/app/utility/services/navigate/navigate.service';
import { Pagination, buildPaginationUrl } from 'src/app/utility/services/paging/paging';
import { MessageService } from 'src/app/utility/services/message/message.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAutheniticate = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private messageService: MessageService,
    private navigate: NavigateService
  ) { }

  IsTokenExpire() {
    let expireDt = this.storage.getItem('.expires');

    if (expireDt != null) {
      expireDt = moment.utc(expireDt).toDate();
      expireDt = new Date(
        moment(expireDt)
          .local()
          .format('YYYY-MM-DD HH:mm:ss')
      );

      const currentDt = new Date(
        moment(new Date())
          .local()
          .format('YYYY-MM-DD HH:mm:ss')
      );
      return currentDt > expireDt;
    } else {
      return true;
    }
  }
  setAuthenitication(isAuth: boolean) {
    this.isAutheniticate.next(isAuth);
  }

  getAuthenitication() {
    this.setAuthenitication(!this.IsTokenExpire());
    return this.isAutheniticate;
  }

  signup(data: any): Observable<any> {
    return this.http.post('/api/accounts/signup/policyholder', data);
  }

  signin(userName: string, password: string) {
    const data =
      'grant_type=password&username=' + userName + '&password=' + password;
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*',
      'Is-External': 'true'
    });
    this.http.post('/api/token', data, { headers }).subscribe(
      res => {
        Object.keys(res).forEach(x => {
          this.storage.setItem(x, res[x]);
        });
        this.setAuthenitication(true);
        this.navigate.toHome();
      },
      error => { this.messageService.show(error.error.error_description, 'error'); }
    );
  }

  signout() {
    return this.http.post('/api/accounts/signout', {}).subscribe(res => {
      this.signoutLocally();
    });
  }

  checkUserExistByEmail(email: string) {
    return this.http.get('/api/enrol/checkEmail?email=' + email);
  }
  ValidateOtp(otp: string, id: number) {
    return this.http.get('/api/enrol/otpCheck?number=' + otp + '&enrolId=' + id);
  }

  signoutLocally() {
    this.storage.reset();
    this.setAuthenitication(false);
    if (!localStorage.getItem('HashNumber')) {
      this.navigate.toLogin();
      localStorage.clear();
    }


  }


}

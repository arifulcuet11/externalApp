import { MessageService } from 'src/app/utility/services/message/message.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

export class CommonService {

  constructor(protected routePrefix: string,
              protected http: HttpClient
              /* private messageService: MessageService*/) { }

  getById(id: number) {
    return this.http.get(this.routePrefix + '/get/'+ id)
    .pipe(catchError(this.ErrorHandler));
  }

  gets(): Observable<any>{
    return this.http.get(this.routePrefix + '/gets')
    .pipe(catchError(this.ErrorHandler));
  }

  add(data): Observable<any>{
    return this.http.post(this.routePrefix + '/add', data)
    .pipe(catchError(this.ErrorHandler));
  }

  edit(id: number, data): Observable<any>{
    return this.http.put(this.routePrefix + '/edit/'+ id, data)
    .pipe(catchError(this.ErrorHandler));
  }

  delete(id: number): Observable<any>{
    return this.http.delete(this.routePrefix + '/delete/' + id)
    .pipe(catchError(this.ErrorHandler));
  }

  deleteEntity(data): Observable<any>{
    return this.http.post(this.routePrefix + '/delete/', data)
    .pipe(catchError(this.ErrorHandler));
  }

  private ErrorHandler(error: HttpErrorResponse): Observable<any>{
    //this.messageService.show(error.error.message, 'warning');
    return throwError(error);
  }
}

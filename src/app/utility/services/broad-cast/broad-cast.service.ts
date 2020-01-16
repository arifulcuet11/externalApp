
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, ReplaySubject, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';


@Injectable({
  providedIn: 'root'
})
export class BroadCastService {

  // private referenceSubject = new ReplaySubject<any>();
  NAVIGATOR_KEY='navigator';
  private referenceSubject = new BehaviorSubject(this.storageService.getItem(this.NAVIGATOR_KEY));


  constructor(protected http: HttpClient,
    private storageService: StorageService) { }

  setReference(obj){
    this.storageService.setItem(this.NAVIGATOR_KEY, obj);
    this.referenceSubject.next(obj);
  }

  getReference(): Observable<any>{
    return this.referenceSubject.asObservable();
  }


}


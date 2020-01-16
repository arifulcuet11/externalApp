import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DocViewerService {
  routePrefix = "/api/fileToPdf";

  constructor(private http: HttpClient) {}

  get(url: string): Observable<any> {
    const param = new HttpParams().set("url", url);
    return this.http.get(this.routePrefix + "/get", { params: param });
  }
  delete(id: number): Observable<any> {
    return this.http.delete(this.routePrefix + "/delete/" + id);
  }
}

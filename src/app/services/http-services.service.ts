import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Access-Control-Allow-Origin': '*'})
};

const httpFormOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};

const httpHeader = {
  headers: new HttpHeaders({Authorization: environment.ssoAuthorization })
};

@Injectable({
  providedIn: 'root'
})
export class HttpServicesService {

  public apiURL = environment.apiURL;
  constructor(private http: HttpClient) { }

  verifySSO_Token(ssoToken): Observable<any> {
    return this.http.get(this.apiURL + 'simplesso/verifytoken?ssoToken=' + ssoToken, httpHeader).pipe(tap());
  }
}

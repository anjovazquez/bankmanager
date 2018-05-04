import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import { map, filter, scan } from 'rxjs/operators';


import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class LoginService {

  private loginUrl = 'https://try.imatia.com/ontimizeweb/services/qsallcomponents-jee/services/rest/users/login';  // URL to web api
  private _headers = new HttpHeaders().set('Content-Type', 'application/json');
  miStorage = localStorage;

  constructor(private http: HttpClient) { }
  

  PostWithBasicAuth(username:String, password:String): Observable<Object> {
    //console.log(username+':' + password);
    var authorization = 'Basic ' + btoa(username + ':' + password);
    //console.log(authorization);
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", authorization);
    headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
    var body = JSON.stringify({});
    return this.http.post<Observable<Response>>(this.loginUrl, body, {headers: headers, observe: 'response'})
    .map(res => {
        console.log(res.headers.get('x-auth-token'));
        localStorage.setItem('x-auth', res.headers.get('x-auth-token'));
        return res;
      });
  }

}

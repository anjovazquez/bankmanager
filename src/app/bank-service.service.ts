import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
var claveActual = localStorage.getItem('x-auth');
var customersUrl = 'https://try.imatia.com/ontimizeweb/services/qsallcomponents-jee/services/rest/customers/customer/search';  // URL to web api
var guardarUrl = 'https://try.imatia.com/ontimizeweb/services/qsallcomponents-jee/services/rest/customers/customer';
var customertypeidUrl = 'https://try.imatia.com/ontimizeweb/services/qsallcomponents-jee/services/rest/customers/customerType/search'
var accountsUrl = 'https://try.imatia.com/ontimizeweb/services/qsallcomponents-jee/services/rest/customers/customerAccount/search'

@Injectable()
export class BankServiceService {

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<CustomerResponse> {
    var authorization = 'Bearer ' + claveActual;

    let headers = new HttpHeaders();
    headers = headers.append("Authorization", authorization);
    headers = headers.append("Content-Type", "application/json");
    var body = `{"filter":{},"columns":["CUSTOMERID","NAME","SURNAME","ADDRESS","STARTDATE","EMAIL", "PHOTO"],"sqltypes":{}}`;
    return this.http.post<CustomerResponse>(customersUrl, body, {headers: headers});
  }

  getInfo(id:number): Observable<CustomerResponseInfo> {
    var authorization = 'Bearer ' + claveActual;

    let headers = new HttpHeaders();
    headers = headers.append("Authorization", authorization);
    headers = headers.append("Content-Type", "application/json");
    var body = `{"filter":{"CUSTOMERID":`+id+`},"columns":["CUSTOMERID","ID","STARTDATE","NAME","SURNAME","CUSTOMERTYPEID","PHOTO","ADDRESS","EMAIL","COMMENTS","ID_DMS_DOC"],"sqltypes":{"STARTDATE":91,"PHOTO":2004}}`;
    return this.http.post<CustomerResponseInfo>(customersUrl, body, {headers: headers});
  }

  GuardarDatos(id:number, newInfoList:any):Observable<CustomerResponseInfo> {
    var authorization = 'Bearer ' + claveActual;

    let headers = new HttpHeaders();
    headers = headers.append("Authorization", authorization);
    headers = headers.append("Content-Type", "application/json");
    var body = `{"filter":{"CUSTOMERID":`+id+`},"data":{`+newInfoList.surname+newInfoList.email+newInfoList.address+newInfoList.name+newInfoList.id+newInfoList.customerId+newInfoList.startdate+newInfoList.ID_DMS_DOC+newInfoList.customertypeid+newInfoList.comments+`},"sqltypes":{"STARTDATE":91,"PHOTO":2004}}`;
    //console.log(body);
    return this.http.put<CustomerResponseInfo>(guardarUrl, body, {headers: headers});
  }

  InsertarDatos(insertInfoList:any):Observable<CustomerResponseInsert> {
    var authorization = 'Bearer ' + claveActual;
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", authorization);
    headers = headers.append("Content-Type", "application/json");
    var body = `{"data":{"ID":"`+insertInfoList.id+`","STARTDATE":"`+insertInfoList.startdate+`","NAME":"`+insertInfoList.name+`","SURNAME":"`+insertInfoList.surname+`","ADDRESS":"`+insertInfoList.address+`","COMMENTS":"`+insertInfoList.comments+`","ID_DMS_DOC":"`+insertInfoList.ID_DMS_DOC+`","CUSTOMERTYPEID":"`+insertInfoList.customertypeid+`","PHOTO":"`+insertInfoList.photo+`","EMAIL":"`+insertInfoList.email+`"},"sqltypes":{"STARTDATE":91}}`;
    //console.log(body);
    return this.http.post<CustomerResponseInsert>(guardarUrl, body, {headers: headers});
  }

  BuscarCustomerTypeId():Observable<CustomerResponseBuscarCustomerTypeId> {
    var authorization = 'Bearer ' + claveActual;
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", authorization);
    headers = headers.append("Content-Type", "application/json");
    var body = `{"filter":{},"columns":["CUSTOMERTYPEID","DESCRIPTION"],"sqltypes":{}}`;
    return this.http.post<CustomerResponseBuscarCustomerTypeId>(customertypeidUrl, body, {headers: headers});
  }

  
  BorrarDatos(id:number) {
    var authorization = 'Bearer ' + claveActual;

    let headers = new HttpHeaders();
    headers = headers.append("Authorization", authorization);
    headers = headers.append("Content-Type", "application/json");
    var body = `{"filter":{"CUSTOMERID":`+id+`}}`;
    return this.http.request('delete', guardarUrl, {
      body: body, 
      headers: headers
   });
  }
  

  getInfoAccounts(id:number):Observable<CustomerResponseInfoAccounts> {
    var authorization = 'Bearer ' + claveActual;
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", authorization);
    headers = headers.append("Content-Type", "application/json");
    var body = `{"filter":{"CUSTOMERID":`+id+`},"columns":["ACCOUNTID","ENTITYID","OFFICEID","CDID","ANID","ACCOUNT","BALANCE","CUSTOMERID","STARTDATE","ENDDATE"],"sqltypes":{}}`;
    return this.http.post<CustomerResponseInfoAccounts>(accountsUrl, body, {headers: headers});
  }
  
}

interface CustomerResponse {
  code: string;
  message: string;
  data: CustomerData[];
  sqlTypes: string;
}

interface CustomerData {
  SURNAME: string;
  EMAIL: string;
  ADDRESS: string;
  NAME: string;
  CUSTOMERID: string;
  STARTDATE: string;
  PHOTO:string;
}

interface CustomerResponseInfo {
  code: string;
  message: string;
  data: CustomerDataInfo[];
  sqlTypes: string;
}

interface CustomerDataInfo {
  SURNAME: string;
  EMAIL: string;
  ADDRESS: string;
  NAME: string;
  CUSTOMERID: string;
  ID: string;
  CUSTOMERTYPEID: string;
  STARTDATE: Date;
  PHOTO:string;
  COMMENTS:string;
  ID_DMS_DOC:string;
}

interface CustomerResponseInsert {
  code: string;
  message: string;
  data: CustomerDataInsert;
  sqlTypes: string;
}

interface CustomerDataInsert {
  CUSTOMERID:string;
}

interface CustomerResponseBuscarCustomerTypeId {
  code: string;
  message: string;
  data: CustomerDataBuscarCustomerTypeId[];
  sqlTypes: string;
}

interface CustomerDataBuscarCustomerTypeId {
  DESCRIPTION:string;
  CUSTOMERTYPEID:number;
}

interface CustomerResponseInfoAccounts {
  code: string;
  message: string;
  data: CustomerDataInfoAccount;
  sqlTypes: string;
}

interface CustomerDataInfoAccount {
  ACCOUNTID: string;
  ENTITYID: string;
  OFFICEID: string;
  CDID: string;
  ANID: string;
  ACCOUNT: string;
  BALANCE: string;
  CUSTOMERID: string;
  STARTDATE:Date;
  ENDDATE:Date;
}
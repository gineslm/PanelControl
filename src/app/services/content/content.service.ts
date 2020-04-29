import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ApiRestService } from '../apiRest/api-rest.service';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})


export class ContentService  extends ApiRestService{




  constructor(    private http: HttpClient,
                  private auth: AuthService
                   ) {
  super();

  }




  getAll(): any {

    const httpOptions = {
      headers: new HttpHeaders({
        token:  this.auth.token
      })
    };

    return this.http.get(`${this.API_URL}/content`, httpOptions ).pipe(tap((resp: any) => {
    }));
  }



  actObject(id: string, value: string): any {

    const headers = new HttpHeaders({
      token:  this.auth.token
    });
    const body = {
      act : value
    };
    const httpOptions = {
    headers,
    body
    };

    return this.http.delete(`${this.API_URL}/content/${id}`, httpOptions ).pipe(tap((resp: any) => {
    }));
  }



putObject(id: string, object: any): any {


  const headers = new HttpHeaders({
    token:  this.auth.token
  });
  const httpOptions = {
  headers
  };

  return this.http.put(`${this.API_URL}/content/${id}`, object,  httpOptions ).pipe(tap((resp: any) => {
  }));
}



postObject( object: any): any {


  const headers = new HttpHeaders({
    token:  this.auth.token
  });
  const httpOptions = {
  headers
  };

  return this.http.post(`${this.API_URL}/content`, object,  httpOptions ).pipe(tap((resp: any) => {
  }));
}



killObject(id: string): any {


    const httpOptions = {
      headers: new HttpHeaders({
      token:  this.auth.token
      })
    };
    return this.http.delete(`${this.API_URL}/content/kill/${id}`, httpOptions ).pipe(tap((resp: any) => {
    }));
  


}




}

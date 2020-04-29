import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { ApiRestService } from '../apiRest/api-rest.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiRestService{



  constructor(  private http: HttpClient,
                private auth: AuthService,

            ) {
    super();

  }


  getAll(): any {

    const httpOptions = {
      headers: new HttpHeaders({
        token:  this.auth.token
      })
    };

    return this.http.get(`${this.API_URL}/user`, httpOptions ).pipe(tap((resp: any) => {
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

    return this.http.delete(`${this.API_URL}/user/${id}`, httpOptions ).pipe(tap((resp: any) => {
    }));
  }



  putObject(id: string, object: any): any {


    const headers = new HttpHeaders({
      token:  this.auth.token
    });
    const httpOptions = {
    headers
    };

    return this.http.put(`${this.API_URL}/user/${id}`, object,  httpOptions ).pipe(tap((resp: any) => {
    }));
  }



  postObject( object: any): any {


    const headers = new HttpHeaders({
      token:  this.auth.token
    });
    const httpOptions = {
    headers
    };

    return this.http.post(`${this.API_URL}/user`, object,  httpOptions ).pipe(tap((resp: any) => {
    }));
  }



  killObject(id: string): any {

    if (id !== this.auth.userId ){
      // el usuario activo no puede eliminarse

      const httpOptions = {
        headers: new HttpHeaders({
        token:  this.auth.token
        })
      };
      return this.http.delete(`${this.API_URL}/user/kill/${id}`, httpOptions ).pipe(tap((resp: any) => {
      }));
    } else {
      console.log('el usuario logeado no puede eliminarse');
    }


  }

}



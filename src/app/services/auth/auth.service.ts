import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ApiRestService } from '../apiRest/api-rest.service';




@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiRestService {

  loged = false;
  token: string | null = null;
  userId: string | null = null;


  constructor( private http: HttpClient ) {
    super();
  }





  userLogin = (user, pass): any => {

    const body = {
      email: user,
      password: pass
    };


    return this.http.post(`${this.API_URL}/login`, body).pipe(tap((resp: any) => {

      try {
        this.loged = resp.ok;
        this.userId = resp.user._id;
        this.token = resp.token;
      } catch (err) {
      console.log( `Error en Userlogin ${err}`);
      this.loged = false;
      }

    }));
  }



  userLogout = () =>{
    this.loged = false;
    this.userId = null;
    this.token = null;

    console.log('User LOGOUT');

  }


 






}

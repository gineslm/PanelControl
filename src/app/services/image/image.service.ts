import { Injectable, ɵɵresolveBody } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ApiRestService } from '../apiRest/api-rest.service';
import { AuthService } from '../auth/auth.service';
import { ImageModel } from '../../models/imageModel';


@Injectable({
  providedIn: 'root'
})
export class ImageService extends ApiRestService  {




  constructor(  private http: HttpClient,
                private auth: AuthService 
              ) {
        super();

  }




  getAll(): any {
    const httpOptions = {
    headers: new HttpHeaders({token:  this.auth.token})};
    return this.http.get(`${this.API_URL}/image`, httpOptions ).pipe(tap((resp: any) => {}));
  }


  postObject(obj: ImageModel, files: any[] ):any {
    const headers = new HttpHeaders({
      token:  this.auth.token
    });
    const httpOptions = {
    headers
    };
    const formData = new FormData();
    formData.append('inputFile', files[0] );
    formData.append('name', obj.name );
    formData.append('alt', obj.alt );
    formData.append('folder', obj.folder );

    return this.http.post(`${this.API_URL}/image`, formData,  httpOptions ).pipe(tap((resp: any) => {
    }));
  }


  putObject(obj):any {
    const headers = new HttpHeaders({
      token:  this.auth.token
    });
    const httpOptions = {
    headers
    };
    return this.http.put(`${this.API_URL}/image/${obj._id}`, obj,  httpOptions ).pipe(tap((resp: any) => {
    }));
  }


  readDir(): any {
    const headers = new HttpHeaders({
      token:  this.auth.token
    });
    const httpOptions = {
    headers
    };
    return this.http.get(`${this.API_URL}/image/readDir/`, httpOptions ).pipe(tap((resp: any) => {
      console.log(resp);
    }));
  }


  getImageByFileName(filename): any {
    const headers = new HttpHeaders({
      token:  this.auth.token
    });
    const httpOptions = {
    headers
    };
    return this.http.get(`${this.API_URL}/image/name/${filename}`, httpOptions ).pipe(tap((resp: any) => {
      console.log(resp);
    }));
  }

  killObject(id: string): any {
    const httpOptions = {
      headers: new HttpHeaders({
      token:  this.auth.token
      })
    };
    return this.http.delete(`${this.API_URL}/image/kill/${id}`, httpOptions ).pipe(tap((resp: any) => {
    }));
  }

}

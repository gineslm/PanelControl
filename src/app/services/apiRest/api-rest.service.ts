import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ApiRestService {

  //API_URL = 'http://localhost:3000';
  API_URL = 'https://apirest0.herokuapp.com';
  constructor() { }
}

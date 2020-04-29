import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {

  user: string;

  constructor( private auth: AuthService) { }

  ngOnInit() {

  }



  logeo(user: string, pass: string) {

    this.auth.userLogin(user, pass).subscribe(  resp => {
      this.user = resp.user.name;
   });
  }

  logout() {
    this.auth.userLogout();
    this.user = null;
  }


/*   para google signin */

  



}

import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {

  constructor( private router: Router){}

  signout(){
    sessionStorage.removeItem('auth_token');
    this.router.navigate(['/auth/login'])

  }
}

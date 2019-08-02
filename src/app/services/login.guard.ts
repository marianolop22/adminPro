import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor (
    public _userService: UserService,
    public router: Router
  ) { }


  canActivate() {

    if ( this._userService.isLoggedIn () ) {

      console.log ( 'paso el guard')
      return true;
    } else {
      console.log('bloqueado por el guard');
      this.router.navigate (['/login']);
      return false;
    }
  }
  
}
 
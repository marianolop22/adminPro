import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor (
    public _userService:UserService
  ) { }


  canActivate() {

    if ( this._userService.user.role === 'ADMIN_ROLE') {
      console.log('paso por admin');
      

      return true ;
    } else {
      console.log('bloqueado por admin guard');
      this._userService.logout();
      return false;
    }

  }
  
}

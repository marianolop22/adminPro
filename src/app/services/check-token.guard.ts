import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CheckTokenGuard implements CanActivate {

  constructor (
    private _userService: UserService
  ) {

  }

  canActivate(): Promise<boolean> | boolean {

    let token = this._userService.token;
    let payload = JSON.parse ( atob ( token.split ('.')[1]  ) );

    console.log ( payload);

    if ( this.isExpired (payload.exp) ) {
      return false;
    }
    


    return true;
  }


  isExpired ( expiredDate: number) {

    let now = new Date().getTime() / 1000;

    if ( expiredDate < now ) {
      return true;
    } else {
      return false;
    }

    
  }
  
}

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
// import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CheckTokenGuard implements CanActivate {

  constructor (
    private _userService: UserService,
    private router: Router
  ) {

  }

  canActivate(): Promise<boolean> | boolean {

    let token = this._userService.token;
    let payload = JSON.parse ( atob ( token.split ('.')[1]  ) );

    console.log ( payload);

    if ( this.isExpired (payload.exp) ) {
      this.router.navigate (['/login']);
      return false;
    }

    return this.checkAndRenew (payload.exp) ;
  }

  checkAndRenew ( expiredDate: number ): Promise<boolean> {
    return new Promise ( (resolve, reject) => {

      let tokenExp = new Date ( expiredDate * 1000 );
      let now = new Date ();

      now.setTime( now.getTime()  + ( 4 * 60 * 60 * 1000 ) );

      if ( tokenExp.getTime() > now.getTime () ) {
        resolve ( true ); //quiere decir que faltan más de 4 hs para vencer y no lo renuevo
      } else {

        this._userService.renewToken ().subscribe (
          response => {
            resolve (true);
          } ,
          error => {
            this.router.navigate (['/login']);
            reject(false);
          }
        );
      }
    });
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

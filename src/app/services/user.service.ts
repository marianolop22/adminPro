import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  token: string;


  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    this.loadStorage();
  }

  isLoggedIn () {
    
    return ( this.token.length > 1 ) ? true : false;
  }


  loadStorage () {

    if ( localStorage.getItem ('token') ) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse ( localStorage.getItem ( 'user' ) );
    } else {
      this.token = "";
      this.user = null;
    }


  }

  saveStorage (
    id: string,
    token: string,
    user: User
  ) {

    localStorage.setItem ( 'id', id);
    localStorage.setItem ('token', token);
    localStorage.setItem ('user', JSON.stringify ( user ));

    this.user = user;
    this.token = token;
  }


  createUser ( user: User):Observable<any> {

    let url = environment.URL_SERVICE + '/usuario';

    return this.http.post ( url, user )
      .pipe(
        map ( (response:any) => {

          swal('Usuario creado', user.email, 'success');
          return response.usuario;
        })
      );
  }

  logout() {
    this.user = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('id');
    this.router.navigate (['/login']);
  }




  login ( user: User, remember: boolean = false ): Observable<any> {

    if (remember) {
      localStorage.setItem ('email', user.email);
    } else {
      localStorage.removeItem ( 'email');
    }

    let url = environment.URL_SERVICE + '/login';
    return this.http.post (url, user)
      .pipe( 
        map ( (response:any) => {

          this.saveStorage ( response.id, response.token, response.usuario);
          // localStorage.setItem ( 'id', response.id);
          // localStorage.setItem ('token', response.token);
          // localStorage.setItem ('user', JSON.stringify ( response.usuario));

          return true;
        })
      );
  }

  loginGoogle ( token:string ):Observable<any> {

    let url = environment.URL_SERVICE + '/login/google';

    return this.http.post ( url, { token } )
      .pipe (
        map ( (response:any)=> {
          console.log ( response );
          this.saveStorage ( response.id, response.token, response.usuario);
          return true;
        })
      );

  }




 }

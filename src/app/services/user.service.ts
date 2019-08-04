import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UploadFileService } from './upload-file.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  token: string;
  menu: any = [];


  constructor(
    private http: HttpClient,
    private router: Router,
    private _updaloadFileService: UploadFileService
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
      this.menu = JSON.parse ( localStorage.getItem ( 'menu' ) );
    } else {
      this.token = "";
      this.user = null;
      this.menu = [];
    }

  }

  saveStorage (
    id: string,
    token: string,
    user: User,
    menu: any
  ) {

    localStorage.setItem ( 'id', id);
    localStorage.setItem ('token', token);
    localStorage.setItem ('user', JSON.stringify ( user ));
    localStorage.setItem ('menu', JSON.stringify ( menu ));

    this.user = user;
    this.token = token;
    this.menu = menu;
  }


  createUser ( user: User):Observable<any> {

    let url = environment.URL_SERVICE + '/usuario';

    return this.http.post ( url, user )
      .pipe(
        map ( (response:any) => {

          swal('Usuario creado', user.email, 'success');
          return response.usuario;
        }),
        catchError ( err => {
          console.log (err.status);
          console.log (err.error.message);

          return Observable.throw ( err );
          //return false; 
        })
      );
  }

  logout() {
    this.user = null;
    this.token = '';
    this.menu = [];
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('menu');
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
          this.saveStorage ( response.id, response.token, response.usuario, response.menu);
          return true;
        }),
        catchError ( err => {
          console.log (err.status);
          console.log (err.error.message);

          return Observable.throw ( err );
          //return false; 
        })
      );
  }

  loginGoogle ( token:string ):Observable<any> {

    let url = environment.URL_SERVICE + '/login/google';

    return this.http.post ( url, { token } )
      .pipe (
        map ( (response:any)=> {
          this.saveStorage ( response.id, response.token, response.usuario, response.menu);
          return true;
        })
      );

  }

  updateUser ( user:User ):Observable<any> {

    let url = environment.URL_SERVICE + '/usuario/' + user._id;
    url += `?token=${this.token}`;

    return  this.http.put (url, user)
      .pipe(
        map ( (response:any) => {

          if ( user._id === this.user._id ) {
            this.saveStorage ( response.usuario._id, this.token, response.usuario, this.menu);
          }

          swal('Usuario Actualizado', user.nombre, 'success');
          return true;
        })
      );
  }

  uploadImage (file:File, id:string ) {

    this._updaloadFileService.uploadFiles ( file, 'usuarios', id )
      .then ( (response:any) => {
        console.log ( response );

        swal ('Actualizacion de imagen', this.user.nombre, 'success');

        this.user.img = response.usuario.img;
        this.saveStorage ( id, this.token, this.user, this.menu);


      })
      .catch ( error => {
        console.log (error);
      })
  }

  loadUsers( from: number = 0): Observable<any> {

    let url = environment.URL_SERVICE + `/usuario?desde=${from}`;

    return this.http.get(url);

  }

  searchUsers ( term:string ):Observable<any> {

    let url = environment.URL_SERVICE + `/busqueda/coleccion/usuarios/${term}`;

    return this.http.get ( url )
      .pipe(
        map ( (response:any)=>{
          return response.usuarios;
        } )
      );
  }


  deleteUser ( id:string ): Observable<any> {

    let url = environment.URL_SERVICE + `/usuario/${id}?token=${this.token}`;

    return this.http.delete (url)
      .pipe (
        map ( response => {
          swal("Usuario borrado", 'el usuario ah sido borrado correctamente', {
            icon: "success",
          });
          return true;
        })
      );
  }



 }

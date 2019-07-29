import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/service.index';
import { User } from '../models/user.model';

declare function init_plugins();
declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string;
  // password:string;
  rememberMe:boolean = false;
  auth2:any;

  constructor( 
    public _userService:UserService,
    private router:Router,
    private ngZone: NgZone
    ) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem ('email') || '';
    if ( this.email.length > 1) {
      this.rememberMe = true;
    }
  }


  googleInit () {

    gapi.load ('auth2', ()=> {
      this.auth2 = gapi.auth2.init({
        client_id: '553225366263-9q9i50kvp76mlu3g2d15n40ik38qhi4v.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignIn ( document.getElementById ('btnGoogle'));

    });



  }

  attachSignIn (element) {

    this.auth2.attachClickHandler ( element, { }, googleUser => {

      let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      this._userService.loginGoogle ( token ).subscribe (
        response => {
          this.ngZone.run(() => this.router.navigate (['/dashboard'])).then(); //esta va porque viene desde google y luego navega
          
        }
      );


    });


  }


  public ingresar( form: NgForm ) {

    if ( form.invalid) {
      return;
    }

    let user = new User (
      null,
      form.value.email,
      form.value.password
    )

    this._userService.login ( user, this.rememberMe  ).subscribe (
      response => {
        this.router.navigate (['/dashboard']);
      }
    );

    // this.router.navigate (['/dashboard']);
  }

}

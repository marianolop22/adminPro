import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/service.index';
import { User } from 'src/app/models/user.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:User;

  constructor(
    public _userService :  UserService
  ) {
    this.user = this._userService.user;
  }

  ngOnInit() {
  }

  save ( user:User ) {

    this.user.nombre = user.nombre;
    if ( !this.user.google ) {
      this.user.email = user.email ;
    }

    this._userService.updateUser ( this.user ).subscribe(
      response => {
      }
    );



  }

}

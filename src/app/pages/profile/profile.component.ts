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
  imageUpload: File;
  imageTmp: string;

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

  selectImage ( file:File ) {

    if ( !file ) {
      this.imageUpload = null;
      return;
    }
    
    if ( file.type.indexOf ('image') < 0 ) {
      swal ('Solo imagenes', 'El archivo debe ser una imagen', 'error');
      this.imageUpload = null;
      return;
    }

    this.imageUpload = file;

    let reader = new FileReader();
    reader.readAsDataURL ( file );
    reader.onloadend = () => {

      //console.log (reader.result);
      this.imageTmp = reader.result.toString();
    }
  }

  uploadImage () {
    this._userService.uploadImage( this.imageUpload, this.user._id);
  }



}

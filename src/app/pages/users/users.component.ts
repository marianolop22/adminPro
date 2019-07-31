import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: Array<User> = [];
  from: number = 0;
  total: number = 0;
  loading: boolean = true;



  constructor(
    public _userService: UserService,
    public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {

    this.loadUsers();
    this._modalUploadService.notification.subscribe (
      response => {
        this.loadUsers ();
      }
    );

  }

  loadUsers () {

    this.loading = true;
    this._userService.loadUsers ( this.from ).subscribe (
      (response:any) => {
        console.log (response);
        this.total = response.total;
        this.users = response.usuarios;

      }
    ).add ( ()=> {
      this.loading = false;
    });
  }

  changePage ( from: number ) {

    let cFrom = this.from + from;

    if ( cFrom >= this.total ) {
      return;
    }

    if ( cFrom < 0 ) {
      return;
    }
    this.from = cFrom;
    this.loadUsers();
  }

  searchUser ( term:string ) {

    if ( term.length <= 0 ) {
      this.loadUsers ();
      this.from = 0;
      return;
    }

    this._userService.searchUsers ( term ).subscribe (
      response => {
        this.users = response;
      }
    );
  }

  deleteUser (user:User ) {

    if ( user._id === this._userService.user._id ) {
      swal ('No se puede borrar usuario', 'No te puedes borrar', 'error');
      return;
    }

    swal({
      title: 'Está seguro?',
      text: 'Está a punto de borrar a ' + user.nombre,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {

      if (willDelete) {

        this._userService.deleteUser ( user._id ).subscribe (
          (response:boolean) => {
            this.loadUsers();
          }
        );
      }
    });
  }

  saveUser ( user:User ) {

    this._userService.updateUser ( user ).subscribe (
      response => {
        console.log( response );
      }
    );
  }

  showModal( id:string ) {
    this._modalUploadService.showModal ( 'usuarios', id );
  }

}

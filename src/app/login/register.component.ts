import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  form:FormGroup;

  constructor() {
  }
  
  ngOnInit() {
    init_plugins();

    this.form = new FormGroup ( {
      nombre: new FormControl(
        null,
        Validators.required
      ),
      correo: new FormControl(
        null, 
        [Validators.required, Validators.email]
      ),
      password: new FormControl(
        null,
        Validators.required
      ),
      password2: new FormControl(
        null,
        Validators.required
      ),
      condiciones: new FormControl(
        false
      )
    }, {
      validators: this.areEquals('password','password2')
    } );
  }

  registerUser () {
    console.log ( this.form.value );

    console.log (this.form.valid );

    if ( this.form.invalid ) {
      return;
    }

    if ( !this.form.value.condiciones ) {
      console.log ('debe aceptar las condiciones');
      return;
    }

  }

  areEquals ( field1: string, field2: string) {

    return ( group: FormGroup ) => {

      let pass1 = group.controls[field1].value;
      let pass2 = group.controls[field2].value;

      if ( pass1 === pass2 ) {
        return null;
      }

      return {
        areEquals: true
      };

    };


  }

}

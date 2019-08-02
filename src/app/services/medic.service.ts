import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';
import { Medic } from '../models/medic.model';

@Injectable({
  providedIn: 'root'
})
export class MedicService {

  constructor(
    private http: HttpClient,
    private _userService: UserService

  ) { }

  getMedic ( id:string): Observable<Medic> {

    let url = environment.URL_SERVICE + `/medico/${id}`;

    return this.http.get (url )
      .pipe(
        map ( (response:any)=> {
          return response.medico;

        })
      );
  }

  getMedicList (): Observable<Array<Medic>> {

    let url = environment.URL_SERVICE + `/medico`;

    return this.http.get (url)
      .pipe(
        map ( (response:any)=> {
          return response.medicos;
        })
      );
  }




  searchMedics ( term:string ):Observable<Array<Medic>> {

    let url = environment.URL_SERVICE + `/busqueda/coleccion/medicos/${term}`;

    return this.http.get ( url )
      .pipe(
        map ( (response:any)=>{
          return response.medicos;
        } )
      );
  }


  updateMedic ( medic:Medic ): Observable<Medic> {

    let url = environment.URL_SERVICE + `/medico/${medic._id}?token=${this._userService.token}`;

    return this.http.put (url, medic )
      .pipe(
        map ( (response:any)=> {
          return response.medicoActualizado;
        })
      );
  }

  deleteMedic ( id:string ): Observable<boolean> {

    let url = environment.URL_SERVICE + `/medico/${id}?token=${this._userService.token}`;

    return this.http.delete (url)
      .pipe(
        map ( (response:any)=> {

          swal("Medico borrado", 'el Medico ah sido borrado correctamente', {
            icon: "success",
          });
          return true;

        })
      );
  }


  createtMedic ( medic:Medic ): Observable<Medic> {

    let url = environment.URL_SERVICE + `/medico?token=${this._userService.token}`;

    return this.http.post (url, medic)
      .pipe(
        map ( (response:any)=> {
          return response.medico;
        })
      );
  }

}

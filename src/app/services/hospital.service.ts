import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UploadFileService } from './upload-file.service';
import { Hospital } from '../models/hospital.model';
import { UserService } from './user.service';



@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(
    private http: HttpClient,
    private _userService: UserService

  ) { }

  getHospital ( id:string): Observable<Hospital> {

    let url = environment.URL_SERVICE + `/hospital/byid`;

    return this.http.get (url, { params: { id: id } } )
      .pipe(
        map ( (response:any)=> {
          return response.hospital;

        })
      );
  }

  getHospitalList (): Observable<Array<Hospital>> {

    let url = environment.URL_SERVICE + `/hospital`;

    return this.http.get (url)
      .pipe(
        map ( (response:any)=> {
          return response.hospitales;
        })
      );
  }




  searchHospitals ( term:string ):Observable<Array<Hospital>> {

    let url = environment.URL_SERVICE + `/busqueda/coleccion/hospitales/${term}`;

    return this.http.get ( url )
      .pipe(
        map ( (response:any)=>{
          return response.hospitales;
        } )
      );
  }


  updateHospital ( hospital:Hospital ): Observable<Hospital> {

    let url = environment.URL_SERVICE + `/hospital/${hospital._id}?token=${this._userService.token}`;

    return this.http.put (url, hospital )
      .pipe(
        map ( (response:any)=> {
          return response.hospitalActualizado;
        })
      );
  }

  deleteHospital ( id:string ): Observable<boolean> {

    let url = environment.URL_SERVICE + `/hospital/${id}?token=${this._userService.token}`;

    return this.http.delete (url)
      .pipe(
        map ( (response:any)=> {

          swal("Hospital borrado", 'el hospital ah sido borrado correctamente', {
            icon: "success",
          });
          return true;

        })
      );
  }


  createtHospital ( hospital:Hospital ): Observable<Hospital> {

    let url = environment.URL_SERVICE + `/hospital?token=${this._userService.token}`;

    return this.http.post (url, hospital)
      .pipe(
        map ( (response:any)=> {
          return response.hospital;
        })
      );
  }
}

import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(

  ) { }

  uploadFiles ( file:File, type: string, id:string ) {

    return new Promise ( (resolve, reject) => {
      let formData = new FormData (); //payload que vamos a enviar
      let xhr = new XMLHttpRequest();
  
      formData.append ('imagenes', file, file.name);
  
      xhr.onreadystatechange = function () { //notificado con cualquier cambio
  
        if ( xhr.readyState === 4 ) { //cuando termina el proceso
          
          if ( xhr.status === 200 ) {
  
            console.log ('terminó de subir la imagem');
            resolve ( xhr.response );
            } else {
            console.log ('falló la subida');
            reject ( xhr.response );
          }
        }
      }

      let url = environment.URL_SERVICE + `/upload/${type}/${id}`;

      xhr.open('PUT', url, true);

      xhr.send(formData);
    });




  }


}

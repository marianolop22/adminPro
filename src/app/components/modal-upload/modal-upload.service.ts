import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public type: string;
  public id: string;

  public oculto:string = 'oculto';
  public notification = new EventEmitter<any> ();


  constructor() {}

  hideModal () {
    this.id = null;
    this.type = null;    
    this.oculto = 'oculto';
  }

  showModal ( type:string, id:string  ) {
    this.oculto = '';
    this.id = id;
    this.type = type;
  }

}

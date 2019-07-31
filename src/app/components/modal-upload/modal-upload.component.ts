import { Component, OnInit } from '@angular/core';
import { UploadFileService, ModalUploadService } from 'src/app/services/service.index';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styleUrls: ['./modal-upload.component.css']
})
export class ModalUploadComponent implements OnInit {

  imageUpload: File;
  imageTmp: string;


  constructor(
    public _uploadFileService: UploadFileService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
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

    this._uploadFileService.uploadFiles ( this.imageUpload, this._modalUploadService.type, this._modalUploadService.id)
      .then ( response => {

        console.log (response);
        this._modalUploadService.notification.emit ( response );
        this.closeModal();

      })
      .catch (err => {
        console.log ('error al cargar', err);
      });
  }

  closeModal () {
    this.imageTmp = null;
    this.imageUpload = null;
    this._modalUploadService.hideModal();
  }


}

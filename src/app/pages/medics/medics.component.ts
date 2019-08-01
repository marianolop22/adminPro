import { Component, OnInit } from '@angular/core';
import { Medic } from 'src/app/models/medic.model';
import { MedicService, ModalUploadService } from 'src/app/services/service.index';

@Component({
  selector: 'app-medics',
  templateUrl: './medics.component.html',
  //styleUrls: ['./medics.component.css']
})
export class MedicsComponent implements OnInit {

  total:number = 0;
  medicList: Array<Medic> = [];

  constructor(
    private _medicService: MedicService,
    private _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {

    this.loadMedics ();
  }

  loadMedics () {
    this._medicService.getMedicList().subscribe (
      response => {
        this.medicList = response;
        this.total = this.medicList.length;
      }
    )
  }


  searchMedic ( text:string) {

    if (!text) {
      this.loadMedics();
      return;
    }

    this._medicService.searchMedics ( text ).subscribe (
      response => {
        this.medicList = response;
      }
    );
  }

  showModal ( id:string) {
    this._modalUploadService.showModal ( 'medicos', id );

  }

  deleteMedic ( medic: Medic) {

    this._medicService.deleteMedic ( medic._id ).subscribe (
      response => {
        console.log (response);
        this.loadMedics ();
      }
    );


  }



}

import { Component, OnInit } from '@angular/core';
import { HospitalService, ModalUploadService } from 'src/app/services/service.index';
import { Hospital } from 'src/app/models/hospital.model';

declare var swal: any;

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.css']
})
export class HospitalsComponent implements OnInit {

  loading: boolean; true;
  total: number = 0;
  hospitalList: Array<Hospital>;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.loadHospitals();
    this._modalUploadService.notification.subscribe (
      response => {
        this.loadHospitals ();
      }
    );
  }

  loadHospitals () {

    this._hospitalService.getHospitalList().subscribe (
      response => {
        this.hospitalList = response;
        this.total = this.hospitalList.length;
      }
    );
  }




  searchHospital ( text:string) {
    if ( !text ) {
      this.loadHospitals();
      return;
    }

    this._hospitalService.searchHospitals (text).subscribe (
      response => {
        this.hospitalList = response;
      }
    );
  }

  showModal (id:string) {
    this._modalUploadService.showModal ( 'hospitales', id );
  }


  saveHospital ( hospital:Hospital) {

    this._hospitalService.updateHospital ( hospital ).subscribe (
      response => {
        console.log( response );
      }
    );


  }

  deleteHospital ( hospital:Hospital) {

    this._hospitalService.deleteHospital ( hospital._id).subscribe(
      response => {
        console.log (response);
        this.loadHospitals();
      }
    );
  }

  createHospital () {

    swal({
      text: 'Ingrese el Nombre del Hospital',
      content: "input",
      button: {
        text: "Crear",
        closeModal: true,
      }
    })
    .then(name => {
      if (!name) return;
     
      let hospital = new Hospital ( name );

      this._hospitalService.createtHospital (hospital).subscribe(
        response => {
          console.log (response);
          this.loadHospitals();
        }
      );
      
    })


  }


}

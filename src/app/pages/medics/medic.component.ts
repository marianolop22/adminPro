import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HospitalService, MedicService } from 'src/app/services/service.index';
import { Hospital } from 'src/app/models/hospital.model';
import { Medic } from 'src/app/models/medic.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-medic',
  templateUrl: './medic.component.html',
  //styleUrls: ['./medic.component.css']
})
export class MedicComponent implements OnInit {

  hospitalList: Array<Hospital> = [];
  medic: Medic = new Medic('','','','');
  hospital: Hospital = new Hospital ('');


  constructor(
    private _hospitalService: HospitalService,
    private _medicService: MedicService,
    public router: Router,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._hospitalService.getHospitalList ().subscribe (
      response => {
        this.hospitalList = response;
      }
    );

    this.route.params.subscribe (
      params => {

        let id = params['id'];

        if ( id !== 'nuevo') {
          this.loadMedic (id);
        }

      }
    );


  }

  loadMedic ( id:string ) {

    this._medicService.getMedic (id).subscribe (
      response => {
        this.medic = response;
        this.selectHospital ( this.medic.hospital);


      }
    );
  }



  saveMedic ( form:NgForm) {

    if ( form.invalid ) {
      return;
    }

    if ( this.medic._id ) {

      this._medicService.updateMedic ( this.medic ).subscribe (
        response => {
          console.log ( response);
        }
      );
    } else {

      this._medicService.createtMedic ( this.medic ).subscribe (
        response => {
          console.log ( response);
  
          this.medic._id = response._id
          this.router.navigate (['/medico', this.medic._id]);
        }
      );
    }

  }

  selectHospital ( id:string ) {

    if ( id =="") {
      this.hospital = new Hospital ('');
    } else {
      this.hospital = this.hospitalList.find ( (item) => item._id == id ) ;
    }
  }


}

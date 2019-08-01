import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HospitalService, MedicService } from 'src/app/services/service.index';
import { Hospital } from 'src/app/models/hospital.model';
import { Medic } from 'src/app/models/medic.model';

@Component({
  selector: 'app-medic',
  templateUrl: './medic.component.html',
  //styleUrls: ['./medic.component.css']
})
export class MedicComponent implements OnInit {

  hospitalList: Array<Hospital> = [];
  medic: Medic = new Medic('','','','');

  constructor(
    private _hospitalService: HospitalService,
    private _medicService: MedicService
  ) { }

  ngOnInit() {
    this._hospitalService.getHospitalList ().subscribe (
      response => {
        this.hospitalList = response;
      }
    );


  }

  saveMedic ( form:NgForm) {

    if ( form.invalid ) {
      return;
    }

    this._medicService.createtMedic ( this.medic ).subscribe (
      response => {
        console.log ( response);
      }
    );





  }



}

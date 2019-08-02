import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user.model';
import { Hospital } from 'src/app/models/hospital.model';
import { Medic } from 'src/app/models/medic.model';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  userList: Array<User> = [];
  hospitalList:Array <Hospital> = [];
  medicList: Array<Medic> = [];





  constructor(
    public route: ActivatedRoute,
    public http: HttpClient
  ) { }

  ngOnInit() {

    this.route.params.subscribe (
      params => {
        console.log ( params['term']);
        this.search ( params['term'] );
      }
    );
  }


  search ( term:string ) {

    let url = environment.URL_SERVICE + `/busqueda/todo/${term}`;

    this.http.get ( url ).subscribe (
      (response:any) => {
        console.log ( response);

        this.userList = response.usuarios;
        this.hospitalList = response.hospitales;
        this.medicList = response.medicos;

      }
    );


  }




}

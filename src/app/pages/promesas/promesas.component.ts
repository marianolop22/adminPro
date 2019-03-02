import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    this.contarTres().then(resolve => {
      console.log('termino ', resolve);
    })
      .catch(error => {
        console.error('error en la promesa ' + error);
      });

  }

  ngOnInit() {
  }


  public contarTres():Promise<boolean> {


    return new Promise<boolean>((resolve, reject) => {

      let contador = 0;

      let intervalo = setInterval(() => {

        contador += 1;
        console.log(contador);

        if (contador == 3) {
          resolve(true);
          //reject( 'error en el contador' );
          clearInterval(intervalo); //se hace para matar el intervalo
        }

      }, 1000);


    });

     
  }



}

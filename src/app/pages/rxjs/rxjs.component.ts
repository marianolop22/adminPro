import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription, forkJoin } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {


  subscription: Subscription;


  constructor() {

    // this.contarTres().pipe( 
    //   retry(2)
    // ).subscribe ( (response:any) => {
    //   console.log ( 'respuesta', response) ;
    // }, error => { 
    //   console.error ( 'hay error', error );

    // }).add ( ()=> { 
    //   console.log ('terminó')
    // });

    // this.subscription = this.contarTresInfinito().subscribe(
    //   (response: any) => {
    //     console.log('respuesta', response);
    //   },
    //   (error) => {
    //     console.error('hay error', error);
  
    //   });




  }

 
  ngOnInit() {

    forkJoin(this.func1(), this.func2()).subscribe ( ([response1, response2])=>{


      console.log ('respuestas',response1);
      console.log ('respuestas',response2);
    });
  }

 
  ngOnDestroy() {
    //this.subscription.unsubscribe();
    console.log ('la pagina se va a cerrar'); 
  }
  

  public func1():Observable<any> {

    return new Observable ( (observer:Subscriber<any>)=>{

      setTimeout(() => {


        var fecha = new Date()
        observer.next('hola func 1 ' + fecha.toString() );
        observer.complete();
        
      }, 2000);


    } )


  }
  public func2():Observable<any> {

    return new Observable ( (observer:Subscriber<any>)=>{

      setTimeout(() => {

        var fecha = new Date()
        observer.next('hola func 2 '+ fecha.toString());
        observer.complete();
        
      }, 500);


    } )


  }



  
  public contarTres(): Observable<any> {

    return new Observable((observer: Subscriber<any>) => {

      let contador = 0;
      let intervalo = setInterval(() => {

        contador++;

        const salida = {
          valor: contador
        }

        observer.next(salida); //esto es lo que notifica

        if (contador == 3) {
          clearInterval(intervalo);
          observer.complete();
        }

        // if (contador == 2) {
        //   //clearInterval ( intervalo);
        //   observer.error ( 'auxilio');
        // } 

      }, 1000);

    }).pipe(
      map(response => {
        return response.valor;
      }),
      filter((response, index) => { //el filter siempre devuelve un bool, el primer valor es el response y el segundo la cantidad de veces que es llamado

        if ((response % 2) == 1) {
          //impar
          return true;
        } else {
          //par
          return false;
        }
      })
    );


  }


  public contarTresInfinito(): Observable<any> {

    return new Observable((observer: Subscriber<any>) => {

      let contador = 0;
      let intervalo = setInterval(() => {

        contador++;
        const salida = {
          valor: contador
        }

        observer.next(salida); //esto es lo que notifica

      }, 1000);

    }).pipe(
      map(response => {
        return response.valor;
      }),
      filter((response, index) => { //el filter siempre devuelve un bool, el primer valor es el response y el segundo la cantidad de veces que es llamado

        if ((response % 2) == 1) {
          //impar
          return true;
        } else {
          //par
          return false;
        }
      })
    );

    
  }
  

}

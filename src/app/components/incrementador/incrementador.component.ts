import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @Input('nombre') leyenda:string = 'Leyenda';
  @Input() progreso: number = 20;  

  @Output() cambioValor: EventEmitter<Number>= new EventEmitter();

  @ViewChild('txtProgress') txtProgress:ElementRef;

  constructor() { }

  ngOnInit() {
  }

  public cambiarValor( valor:number ) {

    if ( (this.progreso + valor) > 100 || ( this.progreso + valor) < 0 ) {
      return;
    }
   
    this.progreso += valor;

    this.cambioValor.emit (this.progreso);
    this.txtProgress.nativeElement.focus();
  }

  public onChange ( newValue: number) {
   

    if ( newValue > 100) {
      this.progreso = 100
    } else if ( newValue < 0 ) {
      this.progreso = 0
    } else {
      this.progreso = newValue
    }

    this.txtProgress.nativeElement.value = this.progreso;

    this.cambioValor.emit (this.progreso);
  }

}

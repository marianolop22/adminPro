import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { SettingsService } from 'src/app/services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor( private _ajustes: SettingsService ) { }

  ngOnInit() {

    this.colocarCheck ();
  }

  public cambiarColor ( tema:string, link:any) {

    this._ajustes.aplicarTema (tema);
    this.aplicarCheck (link);

  }

  public aplicarCheck( link:any ) {

    let selectores:any = document.getElementsByClassName ('selector');

    for ( let ref of selectores ) {
      ref.classList.remove('working');
    }
    link.classList.add ('working');
  }

  public colocarCheck () {
    let selectores:any = document.getElementsByClassName ('selector');

    for ( let ref of selectores ) {
      if ( ref.getAttribute('data-theme') == this._ajustes.ajustes.tema ) {
        ref.classList.add ('working');
        break;
      }
    }

  }

}

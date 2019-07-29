import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, type: string = 'user'): any {

    let url = environment.URL_SERVICE + '/img';

    if ( !img ) {
      return url + '/usuarios/xxx';
    }

    if ( img.indexOf ('https') >= 0 ) {
      return img;
    }

    switch (type) {
      case 'usuario':
        url += '/usuarios/' + img;
        break;
      case 'medico':
        url += '/medicos/' + img;
        break;
      case 'hospital':
        url += '/hospitales/' + img;
        break;
      default:
        console.log ('tipo de imagen no existe');
        url += '/usuarios/xxx';
    }

    return url;
  }

}
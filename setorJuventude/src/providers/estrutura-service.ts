import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Administrador } from '../model/administradores';

/*
  Generated class for the EstruturaService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class EstruturaService {

  private link:string="http://dsoutlet.com.br/igrejaApi/estrutura.php?administradoresAll";

  constructor(public http: Http) {
    console.log('Hello UserService Provider');
  }

  administradoresAll():Promise<Administrador[]>{
    return this.http.get(this.link).toPromise().then(response=>response.json());
  }

}

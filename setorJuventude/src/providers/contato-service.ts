import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Administrador } from '../model/administradores';

/*
  Generated class for the ContatoService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ContatoService {

  private link:string="http://dsoutlet.com.br/igrejaApi/contato.php?gestaoAll";

  constructor(public http: Http) {
    console.log('Hello UserService Provider');
  }

  gestaoAll():Promise<Administrador[]>{
    return this.http.get(this.link).toPromise().then(response=>response.json());
  }

}

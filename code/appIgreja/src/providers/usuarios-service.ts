import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { User } from '../model/User';



/*
  Generated class for the UserService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UsuariosService {

  private link:string="http://dsoutlet.com.br/igrejaApi/usuarios.php";
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(public http: Http) {
    console.log('Hello UserService Provider');
  }

  operacao(id:number, type:string) :Promise<boolean>{
    return this.http.post(this.link, JSON.stringify({id, type}), this.headers)
    .toPromise()
    .then(res=>res.json())
    .catch(this.handleErrorMessage);
  }

  private handleErrorMessage(error: any) {
    alert("não se conectou com o servidor");
  }

}

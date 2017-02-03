import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { FormGroup } from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { User } from '../model/User';

/*
  Generated class for the ContaEmailService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ContaService {

  private linkLogin: string = "http://dsoutlet.com.br/igrejaApi/conta.php";
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(public http: Http) {
  }


  logar(type, email, senha): Promise<any> {

    return this.http.post(this.linkLogin, JSON.stringify({ type, email, senha }), { headers: this.headers })
      .toPromise()
      .then(res => res.json(), error => alert("Erro ao tentar se conectar com servidor"));
  }

  editar(usuario: User): Promise<boolean> {

    return this.http.post('http://dsoutlet.com.br/igrejaApi/editarPerfil.php', JSON.stringify(usuario), this.headers)
      .toPromise()
      .then(res => res.json(), error => alert("erro ao editar dados"))
      .catch(err=>{
        alert(err);
      });
  }

}

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
    console.log('Hello ContaEmailService Provider');
  }


  logar(type, email, senha): Promise<any> {

    return this.http.post(this.linkLogin, JSON.stringify({ type, email, senha }), { headers: this.headers })
      .toPromise()
      .then(res => res.json(), error => alert("Erro ao tentar se conectar com servidor"));
  }

  editar(type: string, edicao:FormGroup): Promise<boolean> {

    let email = edicao.get('email').value;
    let genero = edicao.get('genero').value;
    let senhaatual = edicao.get('senhaatual').value;
    let repSenha = edicao.get('repSenha').value;
    let nascimento = edicao.get('nascimento').value;
    let facebook = edicao.get('facebook').value;
    let id = edicao.get('id').value;
    let foto = edicao.get('foto').value;
    let permissao = edicao.get('permissao').value;
    let nome = edicao.get('nome').value;
    
    return this.http.post(this.linkLogin, JSON.stringify({ type, email, genero, senhaatual, repSenha, nascimento, facebook, id, foto, permissao, nome }), { headers: this.headers })
      .toPromise()
      .then(res => res.json(), error => alert("erro ao editar dados"));
  }

}

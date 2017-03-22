import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { User } from '../model/User';

@Injectable()
export class ContaService {

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(public http: Http) {
  }

  logar(type, email, senha): Promise<any> {

    return this.http.post('http://dsoutlet.com.br/igrejaApi/conta.php', JSON.stringify({ type, email, senha }), { headers: this.headers })
      .toPromise()
      .then(res => res.json(), error => alert("Erro ao tentar se conectar com servidor"));
  }

  cadastrar(type: String, Nome: String, Nascimento, Genero: String, Email: String, Senha: String): Promise<boolean> {
    return this.http.post('http://dsoutlet.com.br/igrejaApi/conta.php', JSON.stringify({ type, Nome, Nascimento, Genero, Email, Senha }), this.headers)
      .toPromise()
      .then(res => res.json(), error => alert("Erro no cadastro"))
      .catch(err => {
        alert("Erro ao se comunicar com servidor, tente novamente mais tarde");
      });
  }

  editar(usuario: User): Promise<boolean> {

    return this.http.post('http://dsoutlet.com.br/igrejaApi/editarPerfil.php', JSON.stringify(usuario), this.headers)
      .toPromise()
      .then(res => res.json(), error => alert("Erro ao editar dados"))
      .catch(err => {
        //alert(err);
      });
  }
}

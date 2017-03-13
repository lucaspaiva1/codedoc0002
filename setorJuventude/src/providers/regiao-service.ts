import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the RegiaoService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RegiaoService {

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(public http: Http) {
    console.log('Hello RegiaoService Provider');
  }

  getRegiao(nomeCidade: string): Promise<any> {
    return this.http.get('http://www.dsoutlet.com.br/igrejaApi/listaRegiao.php?nome=' + nomeCidade)
      .toPromise()
      .then(response => response.json())
      .catch(() => alert("Erro ao se conectar com o servidor"));
  }

  editGrupo(regiao): Promise<any> {
    return this.http
      .post('http://www.dsoutlet.com.br/igrejaApi/editRegiao.php', JSON.stringify(regiao), { headers: this.headers })
      .toPromise()
      .then(res => alert(JSON.stringify(res)))
      .catch(() => alert("Erro ao se conectar com o servidor"));

  }
}
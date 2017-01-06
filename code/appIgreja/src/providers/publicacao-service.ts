import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Publicacao } from '../model/publicacao';
/*
  Generated class for the User provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PublicacaoService {

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) {

  }

  novaFicha(publicacao: Publicacao): Promise<any> {
    return this.http
      .post('http://localhost/igrejaApi/addPublicacao.php', JSON.stringify(publicacao), { headers: this.headers })
      .toPromise()
      .then(res => this.extractNewData(res))
      .catch(this.handleErrorMessage);
  }

  private extractNewData(res: Response) {
    let retorno = { type: false, message: '' };
    let data = res.json();
    if (data === true) {
      retorno.type = true;
      retorno.message = 'Publicação Realizada';
    } else {
      retorno.message = 'Ocorreu um erro!';
    }
    return retorno;
  }

  private handleErrorMessage(error: any) {
    let retorno = { type: false, message: 'Ocorreu um erro!' };
    return retorno;
  }

}

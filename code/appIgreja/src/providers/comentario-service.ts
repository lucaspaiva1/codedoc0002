import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Comentario } from '../model/comentario';
import 'rxjs/add/operator/toPromise';
/*
  Generated class for the User provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ComentarioService {

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) {

  }

  addComentario(comentario: Comentario): Promise<any> {
    return this.http
      .post('http://dsoutlet.com.br/igrejaApi/addComentario.php', JSON.stringify(comentario), { headers: this.headers })
      .toPromise()
      .then(res => this.extractAddData(res))
      .catch(this.handleErrorMessage);
  }

  getComentarios(id: number): Promise<any>{
    return this.http.get('http://dsoutlet.com.br/igrejaApi/listaComentario.php?id='+id)
      .toPromise()
      .then(response => this.extractGetData(response))
      .catch(this.handleErrorMessage);
  }

  private extractAddData(res: Response) {
    let retorno = { type: false, message: '' };
    let data = res.json();
    if (data === true) {
      retorno.type = true;
      retorno.message = 'Comentario Realizado';
    } else {
      retorno.message = 'Ocorreu um erro!';
    }
    return retorno;
  }

  private extractGetData(res: Response) {
    let retorno = { type: false, data: [] };
    let data = res.json();
    if (data == null) {
      retorno.data = [];
    } else {
      retorno.type = true;
      retorno.data = data;
    }
    return retorno;
  }

  private handleErrorMessage(error: any) {
    let retorno = { type: false, message: 'Ocorreu um erro!' };
    return retorno;
  }

}

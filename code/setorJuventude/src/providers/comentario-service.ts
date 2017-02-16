import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Comentario } from '../model/comentario';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class ComentarioService {

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) {

  }

  deleteComentario(id: number): Promise<any>{
    return this.http
      .post('http://www.dsoutlet.com.br/igrejaApi/deleteComentario.php', JSON.stringify({id: id}), { headers: this.headers })
      .toPromise()
      .then(res => this.extractDelData(res))
      .catch(this.handleErrorMessage);
  }

  private extractDelData(res: Response) {
    let retorno = { error: false, type: false, message: '' };
    let data = res.json();
    if (data === true) {
      retorno.type = true;
      retorno.message = 'Excluído com sucesso!';
    } else {
      retorno.message = 'Comentário não existe.';
    }
    return retorno;
  }

  addComentario(comentario: Comentario): Promise<any> {
    return this.http
      .post('http://dsoutlet.com.br/igrejaApi/addComentario.php', JSON.stringify(comentario), { headers: this.headers })
      .toPromise()
      .then(res => this.extractAddData(res))
      .catch(this.handleErrorMessage);
  }

  private extractAddData(res: Response) {
    let retorno = { error: false, type: false, message: '' };
    let data = res.json();
    if (data === true) {
      retorno.type = true;
      retorno.message = 'Comentario Realizado';
    } else {
      retorno.message = 'Ocorreu um erro!';
    }
    return retorno;
  }

  getComentarios(id: number): Promise<any>{
    return this.http.get('http://dsoutlet.com.br/igrejaApi/listaComentario.php?id='+id)
      .toPromise()
      .then(response => this.extractGetData(response))
      .catch(this.handleErrorMessage);
  }

  private extractGetData(res: Response) {
    let retorno = { error: false, type: false, data: [] };
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
    let retorno = { error: true, type: false, message: 'Falha na conexão!' };
    return retorno;
  }

}

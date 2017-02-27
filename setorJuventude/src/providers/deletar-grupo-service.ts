import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the DeletarGrupoService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DeletarGrupoService {

  private link: string = "http://dsoutlet.com.br/igrejaApi/deleteGrupo.php";
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(public http: Http) {
    console.log('Hello DeletarGrupoService Provider');
  }

  public deletar(id: number): Promise<boolean> {
    return this.http.post(this.link, JSON.stringify({ id }), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(err => {
        alert("Erro ao se comunicar com servidor, tente novamente mais tarde");
      });
  }

}

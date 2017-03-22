import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DeletarGrupoService {

  private link: string = "http://dsoutlet.com.br/igrejaApi/deleteGrupo.php";
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(public http: Http) {
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

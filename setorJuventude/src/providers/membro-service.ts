import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the MembroService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MembroService {

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(public http: Http) {
    console.log('Hello MembroService Provider');
  }

  public entrarGrupo(IDUsuario, IDGrupo):Promise<boolean>{
    return this.http.post("http://www.dsoutlet.com.br/igrejaApi/entrarGrupo.php", JSON.stringify({IDUsuario, IDGrupo}), {headers: this.headers}).toPromise().then(res=>res.json())
    .catch(()=>this.erro());
  }

  public sairGrupo(IDUsuario, IDGrupo):Promise<boolean>{
    return this.http.post("http://www.dsoutlet.com.br/igrejaApi/sairGrupo.php", JSON.stringify({IDUsuario, IDGrupo}), {headers: this.headers}).toPromise().then(res=>res.json())
    .catch(()=>this.erro());
  }
  
  private erro(){
    alert("Erro ao tentar se conectar com o servidor");
  }

}

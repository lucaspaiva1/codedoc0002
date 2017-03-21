import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the SenhaService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SenhaService {

  private link:string="http://dsoutlet.com.br/igrejaApi/esqueci.php?email=";

  constructor(public http: Http) {
  }

  esqueciSenha(email : string):Promise<boolean>{
    return this.http.get(this.link + email).toPromise().then(response=>response.json());
  }

}

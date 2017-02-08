import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Facebook } from 'ionic-native';
import { User } from '../model/User';

/*
  Generated class for the FacebookService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FacebookService {

  private linkLogin: string = "http://dsoutlet.com.br/igrejaApi/loginFace.php";
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(public http: Http) {
    //id do aplicativo: 1817976801823786
    Facebook.browserInit(1817976801823786, "v2.8");
  }

  logar(): Promise<any> {
    return Facebook.login(["public_profile"]).then(response =>
      this.api(response, "logar")).catch(this.erro);
  }

  vincular(id: number): Promise<User> {
    return Facebook.login(["public_profile"]).then(response =>
      this.apiVincular(response, "vincular", id)).catch(this.erro);
  }

  erro() {
    alert("erro ao tentar se conectar com o servidor");
  }

  api(response, type): Promise<any> {
    let userID = response.authResponse.userID;
    return Facebook.api('/' + response.authResponse.userID + '?fields=id,name,gender,birthday,email,picture', []).then(result =>

      this.http.post(this.linkLogin, JSON.stringify({ type, userID, result }), { headers: this.headers })
        .toPromise()
        .then(res => res.json()
        )
    );
  }

  apiVincular(response, type, id): Promise<User> {
    let userID = response.authResponse.userID;
    return Facebook.api('/' + response.authResponse.userID + '?fields=id,name,gender,birthday,email,picture', []).then(result =>
      this.http.post(this.linkLogin, JSON.stringify({ type, id, userID, result }), { headers: this.headers })
        .toPromise()
        .then(res => res.json()
        )
    );
  }

  status(): Promise<any> {
    return Facebook.getLoginStatus().then(response => response.status);
  }

  logout(): Promise<any> {
    return Facebook.logout().then(response => alert("deslogado com Sucesso"));
  }

}

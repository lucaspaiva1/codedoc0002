import { Headers, Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Facebook } from 'ionic-native';
import { Publicacao } from '../model/publicacao';
import { User } from '../model/User';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class FacebookService {

  private linkLogin: string = "http://dsoutlet.com.br/igrejaApi/loginFace.php";
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(public http: Http) {
    //id do aplicativo: 255509854899402
    Facebook.browserInit(255509854899402, "v2.8");
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
    return Facebook.api('/' + response.authResponse.userID + '?fields=id,name,gender,email,picture', []).then(result =>

      this.http.post(this.linkLogin, JSON.stringify({ type, userID, result }), { headers: this.headers })
        .toPromise()
        .then(res => res.json()
        )
    );
  }

  apiVincular(response, type, id): Promise<User> {
    let userID = response.authResponse.userID;
    return Facebook.api('/' + response.authResponse.userID + '?fields=id,name,gender,email,picture', []).then(result =>
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

  //adicionado para testes
  postar() {
    // let info: number;
    // Facebook.getLoginStatus().then(res => {
    //   alert(JSON.stringify(res));
    //
    // });
    Facebook.showDialog({
      method: 'share',
      href: 'https://developers.facebook.com/docs/'
    }).then(res => alert(JSON.stringify(res)));

  }

}

import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Facebook } from 'ionic-native';
import { User } from '../model/User';
import { Publicacao } from '../model/publicacao';


@Injectable()
export class FacebookService {

  private linkLogin: string = "http://dsoutlet.com.br/igrejaApi/loginFace.php";
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(public http: Http) {
    //id do aplicativo: 655354741315734
    Facebook.browserInit(655354741315734, "v2.8");
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

  postar(publicacao: Publicacao): Promise<any> {
    // Facebook.getAccessToken().then(res=>{
    //   alert(JSON.stringify(res));
    // });

    return this.http
      .post('http://www.codeondemand.com.br/facebook/post.php', JSON.stringify(publicacao), { headers: this.headers })
      .toPromise()
      .then(res => this.extractPost(res))
      .catch(this.handleErrorMessage);

  }

  private extractPost(res: Response) {
    let retorno = { type: false, message: '' };
    let data = res.json();
    alert(JSON.stringify(res));
    if (data !== null) {
      retorno.type = true;
      retorno.message = 'Publicado com sucesso';
    } else {
      retorno.message = 'Ocorreu um erro!';
    }
    return retorno;
  }

  private handleErrorMessage(error: any) {
    let retorno = { error: true, type: false, message: 'Falha na conexão' };
    return retorno;
  }

}

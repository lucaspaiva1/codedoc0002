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

  erro(error) {
    //alert(JSON.stringify(error));
  }

  api(response, type): Promise<any> {
    let userID = response.authResponse.userID;

    /*adiciona publish_actions ao usuario*/
    Facebook.login(["publish_actions"]).then(response => {
    }).catch(this.erro);

    return Facebook.api('/' + response.authResponse.userID + '?fields=id,name,gender,email,picture', []).then(result =>

      this.http.post(this.linkLogin, JSON.stringify({ type, userID, result }), { headers: this.headers })
        .toPromise()
        .then(res => res.json())
    );
  }

  apiVincular(response, type, id): Promise<User> {
    let userID = response.authResponse.userID;

    /*adiciona publish_actions ao usuario*/
    Facebook.login(["publish_actions"]).then(response => {
    }).catch(this.erro);

    return Facebook.api('/' + response.authResponse.userID + '?fields=id,name,gender,email,picture', []).then(result =>
      this.http.post(this.linkLogin, JSON.stringify({ type, id, userID, result }), { headers: this.headers })
        .toPromise()
        .then(res => res.json())
    );
  }

  status(): Promise<any> {
    return Facebook.getLoginStatus().then(response => response.status);
  }

  logout(): Promise<any> {
    return Facebook.logout();
  }

  /*posta uma foto no feed do atual usuário do app*/
  public photoOnFeed(publicacao: Publicacao) {
    Facebook.getLoginStatus().then(res => {
      return this.http
        .post('http://www.dsoutlet.com.br/igrejaApi/photoOnFeed.php', JSON.stringify({ publicacao: publicacao, token: res.authResponse.accessToken, id: res.authResponse.userID }), { headers: this.headers })
        .toPromise()
        .then(res => this.extractPost(res))
        .catch(this.handleErrorMessage);
    });
  }

  /*posta uma foto no feed da página do facebook do setor juventude*/
  public photoOnPage(publicacao: Publicacao) {
    Facebook.getLoginStatus().then(res => {
      return this.http
        .post('http://www.dsoutlet.com.br/igrejaApi/photoAsPage.php', JSON.stringify({ publicacao: publicacao, token: res.authResponse.accessToken, id: res.authResponse.userID }), { headers: this.headers })
        .toPromise()
        .then(res => this.extractPost(res))
        .catch(this.handleErrorMessage);
    });
  }

  /*posta uma mensagem no feed do atual usuário do app*/
  public postOnFeed(publicacao: Publicacao) {
    Facebook.getLoginStatus().then(res => {
      return this.http
        .post('http://www.dsoutlet.com.br/igrejaApi/postOnFeed.php', JSON.stringify({ publicacao: publicacao, token: res.authResponse.accessToken }), { headers: this.headers })
        .toPromise()
        .then(res => this.extractPost(res))
        .catch(this.handleErrorMessage);
    });
  }

  /*posta uma mensagem no feed da página do facebook do setor juventude*/
  public postOnPage(publicacao: Publicacao) {
    Facebook.getLoginStatus().then(res => {
      return this.http
        .post('http://www.dsoutlet.com.br/igrejaApi/postAsPage.php', JSON.stringify({ publicacao: publicacao, token: res.authResponse.accessToken, id: res.authResponse.userID }), { headers: this.headers })
        .toPromise()
        .then(res => this.extractPost(res))
        .catch(this.handleErrorMessage);
    });
  }

  private extractPost(res: Response) {
    let retorno = { type: false, message: '' };
    let data = res.json();
    alert(JSON.stringify(data));
    if (data !== null) {
      retorno.type = true;
      retorno.message = 'Publicado com sucesso';
    } else {
      retorno.message = 'Ocorreu um erro!';
    }
    return retorno;
  }

  private handleErrorMessage(error: any) {
    alert(JSON.stringify(error));
    let retorno = { error: true, type: false, message: 'Falha na conexão' };
    return retorno;
  }

}

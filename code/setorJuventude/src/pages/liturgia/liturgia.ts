import { Component } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-liturgia',
  templateUrl: 'liturgia.html'
})
export class LiturgiaPage {

  private liturgia: any;
  private conteudo: string = '';
  private loaded: boolean = false;

  constructor(public navCtrl: NavController, public http: Http) {
    this.getLiturgia().then(res => {
      this.liturgia = res;
      let i = 0;
      for (let propriedade in this.liturgia.leiturasDoDia) {
        if (i == 0) {
          this.conteudo += "<h3>" + propriedade + ":</h3>" + this.liturgia.leiturasDoDia[propriedade] + "<br><br>Leitura Complementar";
        } else {
          this.conteudo += "<h6>" + propriedade + ":</h6>" + this.liturgia.leiturasDoDia[propriedade] + "<br>";
        }
        i++;
      };
      //console.log(this.liturgia);
      //console.log((this.conteudo));

      document.getElementById("conteudo").innerHTML = this.conteudo;

      this.loaded = true;
    });
  }

  getLiturgia(): Promise<any> {
    return this.http.get('http://www.dsoutlet.com.br/teste/index.php')
      .toPromise()
      .then(response => response.json())
      .catch(this.handleErrorMessage);
  }

  private handleErrorMessage(error: any) {
    let retorno = error.json();
    return retorno;
  }

}

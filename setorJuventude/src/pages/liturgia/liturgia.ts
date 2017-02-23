import { Component } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { NavController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-liturgia',
  templateUrl: 'liturgia.html'
})
export class LiturgiaPage {

  private liturgia: any;
  private conteudo: string = '';
  private loaded: boolean = false;

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public http: Http) {
    this.carregarLiturgia();
  }

  private carregarLiturgia() {
    this.getLiturgia().then(res => {
      if (res.error == false) { //verifica se houve erro
        this.liturgia = res.data;

        /* Cada propriedade é um atributo da liturgia.
          O nome da propriedade é o titulo do texto da biblia.
          O primeiro é o texto principal e os outros fazem parte da leitura complementar*/

        let i = 0; //contador pra separar o texto principal dos demais
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

        document.getElementById("conteudo").innerHTML = this.conteudo; //insere o conteudo da liturgia no HTML da pagina

        this.loaded = true; //liturgia foi totalmente carregada e pode ser exibida.
      } else {
        this.showConfirm(); //caso ocorra um erro.
      }
    });
  }

  private showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Falha na conexão',
      message: 'Tentar Novamente ?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            this.navCtrl.pop();
            //fecha a tela
          }
        },
        {
          text: 'Ok',
          handler: () => {
            this.carregarLiturgia();
            //tenta carregar a liturgia novamente
          }
        }
      ]
    });
    confirm.present();
  }

  private getLiturgia(): Promise<any> {
    return this.http.get('http://www.dsoutlet.com.br/igrejaApi/liturgia/index.php')
      .toPromise()
      .then(response => this.extractData(response))
      .catch(this.handleErrorMessage);
  }

  private extractData(res: Response) {
    let retorno = { error: false, data: null };
    let data = res.json();
    retorno.data = data;
    return retorno;
  }

  private handleErrorMessage(error: any) {
    let retorno = { error: true };
    return retorno;
  }

}

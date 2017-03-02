import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ContatoService } from '../../providers/contato-service';
import { Administrador } from '../../model/administradores';


/*
  Generated class for the Contato page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-contato',
  templateUrl: 'contato.html'
})
export class ContatoPage {

    private gestao: Administrador[] = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public contatoService: ContatoService
    ) {
      this.contatoService.gestaoAll().then(res=>{
        this.gestao = res;
      }).catch(()=>alert("Erro ao se comunicar ocm o servidor"));

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContatoPage');
  }


}

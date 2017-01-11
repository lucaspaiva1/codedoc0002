import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddGrupoPage } from '../add-grupo/add-grupo';
import { EditarGrupoPage } from '../editar-grupo/editar-grupo';
/*
  Generated class for the Busca page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-busca',
  templateUrl: 'busca.html'
})
export class BuscaPage {
  grupos = [];
  editarGrupo = EditarGrupoPage;
  addGrupo = AddGrupoPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.grupos.push({
      nome: 'Grupo Jovem'
    });
    this.grupos.push({
      nome: 'Renovação Carismática'
    });
    this.grupos.push({
      nome: 'Encontro de Casais'
    });
    this.grupos.push({
      nome: 'Crisma'
    });
    this.grupos.push({
      nome: 'Ministros da Eucaristia'
    });
  }

  itemSelected(){}

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuscaPage');
  }

  adicionarGupo(){
    this.navCtrl.push(this.addGrupo);
  }

  editar(){
    this.navCtrl.push(this.editarGrupo);
  }

  deletar(){

  }
}

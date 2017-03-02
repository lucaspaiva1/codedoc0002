import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Administrador } from '../../model/administradores';
import { EstruturaService } from '../../providers/estrutura-service';

/*
  Generated class for the Estrutura page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-estrutura',
  templateUrl: 'estrutura.html'
})
export class EstruturaPage {

  private administradores: Administrador[] = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private estrutraService : EstruturaService
    ) { 

      this.estrutraService.administradoresAll().then(res=>{
        this.administradores = res;
      }).catch(()=>alert("Erro ao se comunicar ocm o servidor"));

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EstruturaPage');
  }

}

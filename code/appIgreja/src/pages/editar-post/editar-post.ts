import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ImagePicker } from 'ionic-native';
import { Camera } from 'ionic-native';

import { Publicacao } from '../../model/publicacao';
import { PublicacaoService } from '../../providers/publicacao-service';

/*
  Generated class for the EditarPost page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-editar-post',
  templateUrl: 'editar-post.html'
})
export class EditarPostPage {

  private publicacao: Publicacao = new Publicacao();

  constructor(public navCtrl: NavController, public navParams: NavParams, public postService: PublicacaoService) {
    let id = navParams.get('id');
    this.postService.getPublicacao(id).then(res=>{
      if(res.type == true){
        this.publicacao = res.data;
        console.log(res.message);
      }else{
        console.log(res.message);
        this.navCtrl.pop();
      }
    });
  }

  importarFoto(){
    let options;
    ImagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
      console.log('Image URI: ' + results[i]);
    }
  }, (err) => { });
  }

  tirarFoto(){
    let options;
    Camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  salvar(){
    this.postService.editPublicacao(this.publicacao).then(res=>{
      if(res.type == true){
        this.navCtrl.pop();
        console.log(res.message);
      }else{
        console.log(res.message);
      }
    });
  }
}

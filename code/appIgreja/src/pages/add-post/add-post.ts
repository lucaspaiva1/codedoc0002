import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Publicacao } from '../../model/publicacao';
import { PublicacaoService } from '../../providers/publicacao-service';
import { ImagePicker } from 'ionic-native';
import { Camera } from 'ionic-native';


@Component({
  selector: 'page-add-post',
  templateUrl: 'add-post.html'
})
export class AddPostPage {

  private publicacao: Publicacao = new Publicacao();


  constructor(public navCtrl: NavController, public navParams: NavParams, public postService: PublicacaoService) {

  }

  adicionar() {
    if (this.publicacao.TempoPermanencia == null) {
      console.log("insira a data limite");
    } else {
      this.postService.novaPublicacao(this.publicacao).then(res => {
        if (res.type == true) {
          console.log(res.message);
          this.navCtrl.pop();
        } else {
          console.log(res.message);
        }
      });
    }
  }

  importarFoto() {
    let options;
    ImagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
      }
    }, (err) => { });
  }

  tirarFoto() {
    let options;
    Camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });

  }
}

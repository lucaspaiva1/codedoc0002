import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ImagePicker } from 'ionic-native';
import { Camera } from 'ionic-native';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarPostPage');
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
    this.navCtrl.pop();
  }
}

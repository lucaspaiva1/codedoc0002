import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the AddPost page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-post',
  templateUrl: 'add-post.html'
})
export class AddPostPage {
  titulo: string;
  texto: string;
  dataLimite;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPostPage');
  }

  adicionar(){
    this.navCtrl.pop();
  }
}

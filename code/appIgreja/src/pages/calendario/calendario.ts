import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NgCalendarModule  } from 'ionic2-calendar';

/*
  Generated class for the Calendario page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-calendario',
  templateUrl: 'calendario.html'
})
export class CalendarioPage {
  calendar;
  mes: string = 'Dezembro';
  constructor( public calendarMd: NgCalendarModule, public navCtrl: NavController, public navParams: NavParams) {
    this.calendar = {
      mode: 'month',
      currentDate: new Date()
    };

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarioPage');
  }
  onCurrentDateChanged($event){}
  reloadSource(startTime, endTime){}
  onEventSelected($event){}
  onViewTitleChanged = (title: string) => {
    this.mes = title;
  };
  onTimeSelected($event){}
}

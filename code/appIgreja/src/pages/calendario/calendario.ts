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
  eventSource;
  isToday:boolean;
  mes: string = 'Dezembro'; //titulo

  constructor( public calendarMd: NgCalendarModule, public navCtrl: NavController, public navParams: NavParams) {
    this.calendar = {
      mode: 'month',
      currentDate: new Date()
    };

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarioPage');
    this.eventSource = this.carregarEventos();
  }
  // funções do calendario
  onCurrentDateChanged(event:Date){
  }
  reloadSource(startTime, endTime){}
  onEventSelected(event){
    //criar alerta se necessário
  }
  onViewTitleChanged = (title: string) => {
    this.mes = title; // atualiza o título
  };
  onTimeSelected(ev){
    console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
        (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
  }

  carregarEventos(){
    var events = [];
    var date = new Date();
    events.push({
      title: 'envento  all day teste 1',
      startTime: new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + 1)),
      endTime: new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + 2)),
      allDay: true
    });
    events.push({
      title: 'envento comum teste 1',
      startTime: new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() - 5, 0, date.getMinutes() + 10)),
      endTime: new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() - 5, 0, date.getMinutes() + 10)),
      allDay: true
    });
    events.push({
      title: 'envento comum teste 2',
      startTime: new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + 7, 0, date.getMinutes() + 10)),
      endTime: new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + 7, 0, date.getMinutes() + 20)),
      allDay: true
    });
    return events;
  }

}

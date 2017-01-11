import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NgCalendarModule  } from 'ionic2-calendar';
import { AddEventoPage } from '../add-evento/add-evento';
import { EventoService } from '../../providers/evento-service';
import { Evento } from '../../model/evento';

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

  private eventos: Evento[] = [];

  addEvento = AddEventoPage;
  calendar;
  eventSource;
  isToday: boolean;
  mes: string = 'Dezembro'; //titulo

  constructor(public calendarMd: NgCalendarModule, public navCtrl: NavController, public navParams: NavParams, public eventoService: EventoService) {
    this.calendar = {
      mode: 'month',
      currentDate: new Date()
    };
  }

  ionViewWillEnter() {
    this.getEventos();
  }

  // funções do calendario
  onCurrentDateChanged(event: Date) {
  }

  reloadSource(startTime, endTime) {

  }

  onEventSelected(event) {
    //criar alerta se necessário
  }

  onViewTitleChanged = (title: string) => {
    this.mes = title; // atualiza o título
  };

  onTimeSelected(ev) {
    console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' + (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
  }

  private getEventos() {
    this.eventoService.getEventos().then(res => {
      if (res.type == true) {
        this.eventos = res.data;

        let events = [];

        for (let evento of this.eventos) {

          events.push({
            title: evento.Titulo,
            startTime: new Date(evento.DataInicio),
            endTime: new Date(evento.DataTermino),
            allDay: evento.EventoDiario
          });
        }

        this.eventSource = events;

      }
      else {
        console.log("error");
      }
    });

  }

  private adicionar() {
    this.navCtrl.push(this.addEvento);
  }
}

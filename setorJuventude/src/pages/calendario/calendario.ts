import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavController, LoadingController, ActionSheetController, AlertController} from 'ionic-angular';
import { NgCalendarModule  } from 'ionic2-calendar';
import { AddEventoPage } from '../add-evento/add-evento';
import { EditarEventoPage } from '../editar-evento/editar-evento';
import { BuscaEventosPage } from '../busca-eventos/busca-eventos';
import { EventoService } from '../../providers/evento-service';
import { Evento } from '../../model/evento';
import { UserService } from '../../providers/user-service';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { MonthViewComponent } from 'ionic2-calendar/monthview';
import { WeekViewComponent } from 'ionic2-calendar/weekview';
import { DayViewComponent } from 'ionic2-calendar/dayview';

@Component({
  selector: 'page-calendario',
  templateUrl: 'calendario.html'
})
export class CalendarioPage {

  private eventos: Evento[] = [];

  private editarEvento = EditarEventoPage;
  private addEvento = AddEventoPage;
  private buscaEventos = BuscaEventosPage;
  private calendar;
  private eventSource = [];
  private isToday: boolean;
  private permissao = "c";
  private mes: string = 'Dezembro'; //titulo
  data = new Date();
  cont: number = 4;


  constructor(public actionSheetCtrl: ActionSheetController,
    public loadingController: LoadingController,
    public calendarMd: NgCalendarModule,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public userService: UserService,
    public eventoService: EventoService) {

    this.calendar = {
      mode: 'month',
      currentDate: new Date()
    };

    this.userService.get().then(res => {
      this.permissao = res.Tipo;
    });

  }

  ionViewWillEnter() {
    this.getEventos();
  }

  // funções do calendario
  onCurrentDateChanged(event: Date) {
    this.calendar.currentDate = event;
  }

  reloadSource(startTime, endTime) {

  }

  onEventSelected(event) { // evento diparado quando um evendo é selecionado na lista
    this.navCtrl.push(this.editarEvento, { id: event.id });
  }

  onViewTitleChanged = (title: string) => { // atualiza o título
    let data = title.split(' ');
    this.mes = data[0] + ' - ' + data[1];
  };

  onTimeSelected(ev) {
    //console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' + (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
  }

  private getEventos() {

    let loader = this.loadingController.create({
      content: "Carregando eventos",
      duration: 5000
    });

    loader.present();

    this.eventoService.getEventos().then(res => {
      if (res.type == true) {
        this.eventos = res.data;
        let events = [];
        for (let evento of this.eventos) {
          events.push({
            id: evento.IDEvento,
            title: evento.Titulo,
            startTime: new Date(evento.DataInicio),
            endTime: new Date(evento.DataTermino),
            allDay: evento.EventoDiario
          });
        }
        this.eventSource = events;
      }
      loader.dismiss();
    });
  }

  private adicionar() {
    this.navCtrl.push(this.addEvento);
  }

  private buscar() {
    this.navCtrl.push(this.buscaEventos);
  }

  private showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Falha na conexão',
      message: 'Tentar Novamente ?',
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Ok',
          handler: () => {
            this.getEventos();
          }
        }
      ]
    });
    confirm.present();
  }
}

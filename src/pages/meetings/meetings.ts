import { MeetingService } from './../../services/meeting-service/meeting-service';
import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Meeting } from '../../models/Meeting';
import { SessionService } from "../../services/session-service/session-service";

@Component({
  selector: 'page-meetings',
  templateUrl: 'meetings.html'
})
export class MeetingsPage {

  constructor(private alertCtrl: AlertController,
    public _meeting: MeetingService,
    public _session: SessionService) {
  }

  // getters
  getMeetingDate(meeting: Meeting): Date {
    return new Date(meeting.date);
  }

  showMeetingDialog() {
    const prompt = this.alertCtrl.create({
      title: 'Agregar reunión',
      inputs: [
        {
          name: 'date',
          type: 'date',
          placeholder: 'Fecha'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
          }
        },
        {
          text: 'Agregar',
          handler: data => {
            this._meeting.meetingsCollection.doc(data.date).set({
              actual: {
                name: '',
                autor: ''
              },
              date: data.date,
              created: this._session.user.nickname,
              history: [],
              sessions: []
            })
            .then(function() {
                console.log("Document successfully written!");
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
          }
        }
      ]
    });
    prompt.present();
  }

  showJoinMeetingDialog(meeting: Meeting) {
    const prompt = this.alertCtrl.create({
      title: 'Unirse al culto?',
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {}
        },
        {
          text: 'Aceptar',
          handler: data => {
            this._session.joinMeeting(meeting);
          }
        }
      ]
    });
    prompt.present();
  }

  showLogoutMeetingDialog() {
    const prompt = this.alertCtrl.create({
      title: 'Abandonar el culto?',
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {}
        },
        {
          text: 'Aceptar',
          handler: data => {
            this._session.logoutMeeting();
          }
        }
      ]
    });
    prompt.present();
  }

  isActualMeeting(meeting: Meeting) {
    console.log(meeting.date);
    console.log(this._session.user.meeting);
    return meeting.date === this._session.user.meeting;
  }
}

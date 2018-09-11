import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { SessionService } from "../../services/session-service/session-service";
import { TabsPage } from "../tabs/tabs";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  nickname: string;

  constructor(public _session: SessionService,
    private navCtrl: NavController,
    private toastCtrl: ToastController) {
  }

  ionViewWillEnter() {
    this._session.initializeUsers();
  }

  login() {
    if (this.nickname) {
      this._session.login(this.nickname, () => {
        this.navCtrl.push(TabsPage);
      });
    } else {
      this.showWriteNameToast();
    }
  }

  showWriteNameToast() {
    const toast = this.toastCtrl.create({
      message: 'Escribe tu nombre para conectarte',
      duration: 3000,
      position: 'top'
    });

    toast.present();
  }
}

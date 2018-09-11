import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { Observable } from 'rxjs';
import { SessionService } from "../services/session-service/session-service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('mainNav') mainNav: NavController;
  
  loginPage:any = LoginPage;
  songs: Observable<any>;

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public _session: SessionService) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  ionViewWillEnter() {
    this._session.initializeUsers();
  }

  logout() {
    this._session.logout(() => {
      this.mainNav.push(LoginPage);
    });
  }
}

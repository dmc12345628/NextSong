import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { IonicStorageModule } from '@ionic/storage';

// prototypes
import '../prototypes/string-prototypes';
import '../prototypes/date-prototypes';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { LoginPage } from '../pages/login/login';
import { MeetingsPage } from '../pages/meetings/meetings';
import { ActualPage } from '../pages/actual/actual';
import { SongsPage } from '../pages/songs/songs';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SongService } from '../services/song-service/song-service';
import { MeetingService } from '../services/meeting-service/meeting-service';
import { SessionService } from '../services/session-service/session-service';

var config = {
  apiKey: "AIzaSyClyMgidzPc3pV8VO5187AHR-9wEJt7LFk",
  authDomain: "nextsong-66d93.firebaseapp.com",
  databaseURL: "https://nextsong-66d93.firebaseio.com",
  projectId: "nextsong-66d93",
  storageBucket: "nextsong-66d93.appspot.com",
  messagingSenderId: "55890734587"
};

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    MeetingsPage,
    ActualPage,
    SongsPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    MeetingsPage,
    ActualPage,
    SongsPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SongService,
    MeetingService,
    SessionService
  ]
})
export class AppModule {}

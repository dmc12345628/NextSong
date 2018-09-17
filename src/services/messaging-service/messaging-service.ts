import { Injectable, Inject } from '@angular/core';
import { FirebaseApp } from "angularfire2";
import * as firebase from "firebase";

@Injectable()
export class MessagingService {

  private messaging: firebase.messaging.Messaging;

  constructor(@Inject(FirebaseApp) private firebaseApp: firebase.app.App) {
    this.messaging = firebase.messaging(this.firebaseApp);
    console.log('test');
    this.messaging.requestPermission().then(() => {
      console.log('Notification permission granted.');
    }).catch((err) => {
      console.log('Unable to get permission to notify. ', err);
    })
  }
}

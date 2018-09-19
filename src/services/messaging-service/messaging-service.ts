import { HTTP } from '@ionic-native/http';
import { Injectable, Inject } from '@angular/core';
import { FirebaseApp } from "angularfire2";
import * as firebase from "firebase";
import { AngularFirestore } from "angularfire2/firestore";
import { SessionService } from "../session-service/session-service";

@Injectable()
export class MessagingService {

  private messaging: firebase.messaging.Messaging;

  constructor(private afs: AngularFirestore,
    @Inject(FirebaseApp) private firebaseApp: firebase.app.App,
    private _session: SessionService,
    private http: HTTP) {
    this.messaging = firebase.messaging(this.firebaseApp);

    this.requestPermission();

    this.getToken();

    this.messaging.onTokenRefresh(() => {
      this.getToken();
    })
  }

  requestPermission() {
    this.messaging.requestPermission().then(() => {
      console.log('Notification permission granted.');
    }).catch((err) => {
      console.log('Unable to get permission to notify. ', err);
    });
  }

  private getToken() {
    this.messaging.getToken().then((currentToken) => {
      if (currentToken) {
        this.saveTokenToFirestore(currentToken);
      } else {
        console.log('No Instance ID token available.');
        this.requestPermission();
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
  }

  private saveTokenToFirestore(token) {
    if (!token) return;

    const devices = this.afs.collection('devices');

    return devices.doc(token).set({
      token,
      nickname: this._session.user.nickname
    });
  }

  listenToNotifications() { }

  sendMessage() {
    this.http.post('https://fcm.googleapis.com/v1/projects/myproject-b5ae1/messages:send', {
      message:{
        token: "bk3RNwTe3H0:CI2k_HHwgIpoDKCIZvvDMExUdFQ3P1...",
        notification: {
          body: "This is an FCM notification message!",
          title : "FCM Message",
        }
      }
    }, {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ya29.ElqKBGN2Ri_Uz...HnS_uNreA'
    })
  }
}

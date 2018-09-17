import { Injectable } from '@angular/core';
import { User } from "../../models/User";
import { AngularFirestoreCollection, AngularFirestore } from "angularfire2/firestore";
import { Observable } from "rxjs";
import { Meeting } from "../../models/Meeting";
import { MeetingService } from "../meeting-service/meeting-service";

@Injectable()
export class SessionService {

  usersCollection: AngularFirestoreCollection<User>;
  usersList: Observable<User[]>;
  users: User[];
  
  user: User = new User();
  meeting: Meeting = new Meeting();

  constructor(private afs: AngularFirestore,
    private _meeting: MeetingService) {
  }

  // init
  initializeUsers() {
    this.usersCollection = this.afs.collection('users');
    this.usersList = this.usersCollection.valueChanges();
    this.usersList.subscribe(users => {
      if (!this.user) {
        this.user = new User();
        this.users = users;
      }
    });
  }

  // getters
  getDocUser() {
    return this.usersCollection.doc(this.user.nickname);
  }

  getMeetingDate(): Date {
    return new Date(this.user.meeting);
  }

  // has
  hasMeeting() {
    return this.user.meeting !== '';
  }

  login(nickname: string, thenCallback) {
    const newDate = new Date();

    this.afs.collection('users').doc(nickname).update({
      active: true,
      connected: newDate.getCompleteDateTime(),
      nickname: nickname
    })
      .then(() => {
        this.afterLogin(nickname, newDate, thenCallback);
      })
      .catch((error) => {
        this.afs.collection('users').doc(nickname).set({
          active: true,
          connected: newDate.getCompleteDate(),
          meeting: '',
          nickname: nickname
        }).then(() => {
          this.afterLogin(nickname, newDate, thenCallback);
        }).catch((err) => {
          console.log('Error writing document: ', err);
        });
      });
  }

  afterLogin(nickname, newDate, thenCallback) {
    this.user = {
      active: true,
      connected: newDate.getCompleteDateTime(),
      meeting: '',
      nickname: nickname
    };

    this.getDocUser().valueChanges().subscribe((user: User) => {
      this.user = user;
      
      if (this.user.meeting) {
        this._meeting.getDocMeeting(this.user.meeting).valueChanges().subscribe((meeting: Meeting) => {
          this.meeting = meeting;
        });
      }
    });
    
    thenCallback();
  }

  logout(thenCallback) {
    this.afs.collection('users').doc(this.user.nickname).update({
      active: false
    })
    .then(() => {
      const newDate = new Date();
      this.user = {
        active: false,
        connected: newDate.getCompleteDate() + ' ' + newDate.toTimeString(),
        meeting: '',
        nickname: ''
      }
      thenCallback();
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
  }

  // meetings
  joinMeeting(meeting: Meeting) {
    this.getDocUser().update({
      meeting: meeting.date
    });
  }

  logoutMeeting() {
    this.getDocUser().update({
      meeting: ''
    });    
  }
}

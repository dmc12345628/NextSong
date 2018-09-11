import { Meeting } from './../../models/Meeting';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from "angularfire2/firestore";
import { Observable } from "rxjs";

@Injectable()
export class MeetingService {

  meetingsCollection: AngularFirestoreCollection<Meeting>;
  meetingsList: Observable<Meeting[]>;
  meetings: Meeting[];

  constructor(private afs: AngularFirestore) {
  }

  initializeMeetings() {
    this.meetingsCollection = this.afs.collection('meetings');
    this.meetingsList = this.meetingsCollection.valueChanges();
    this.meetingsList.subscribe(meetings => {
      this.meetings = meetings;
    });
  }

  getDocMeeting(meetingDate: string) {
    return this.meetingsCollection.doc(meetingDate);
  }
}

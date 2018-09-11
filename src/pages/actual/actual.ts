import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SongService } from "../../services/song-service/song-service";
import { MeetingService } from "../../services/meeting-service/meeting-service";
import { SessionService } from "../../services/session-service/session-service";

@Component({
  selector: 'page-actual',
  templateUrl: 'actual.html'
})
export class ActualPage {

  constructor(public navCtrl: NavController,
    public _song: SongService,
    public _meeting: MeetingService,
    public _session: SessionService) {
  }

  ionViewWillEnter() {
    this._song.initializeSongs();
    this._meeting.initializeMeetings();
  }

  seeMeeting() {
    this.navCtrl.parent.select(1);
  }
}

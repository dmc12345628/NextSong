import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from "angularfire2/firestore";
import { Observable } from "rxjs";
import { Song } from "../../models/Song";
import { MeetingService } from "../meeting-service/meeting-service";
import { SessionService } from "../session-service/session-service";

@Injectable()
export class SongService {

  songsCollection: AngularFirestoreCollection<Song>;
  songsList: Observable<Song[]>;
  songs: Song[];

  searching: boolean;

  constructor(private afs: AngularFirestore,
    private _session: SessionService,
    private _meeting: MeetingService) {
  }

  initializeSongs() {
    this.songsCollection = this.afs.collection('songs');
    this.songsList = this.songsCollection.valueChanges();
    this.songsList.subscribe(songs => {
      if (!this.searching) {
        this.songs = songs;
      }
    })
  }

  addSong(song: Song) {
    const documentName = this.getDocName(song);

    this.songsCollection.doc(documentName).set(song)
      .then(function() {
          console.log("Document successfully written!");
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
      });
  }

  deleteSong(song: Song) {
    const documentName = this.getDocName(song);

    this.songsCollection.doc(documentName).delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
      console.error("Error removing document: ", error);
    });
  }

  playSong(song: Song) {
    const newSong = {
      name: song.name,
      autor: song.autor,
      time: new Date().toLocaleTimeString(),
    };
    if (this._session.meeting.history) {
      const history = this._session.meeting.history;
      history.push(newSong);

      this._meeting.meetingsCollection
        .doc(this._session.meeting.date)
        .update({
          actual: newSong,
          history: history
        });
      
      this._session.meeting.actual = newSong;
      this._session.meeting.history = history;
    } else {
      this._meeting.meetingsCollection
        .doc(this._session.meeting.date)
        .update({
          actual: newSong,
          history: [song]
        });

      this._session.meeting.actual = newSong;
      this._session.meeting.history = [newSong];
    }
  }

  getDocName(song: Song) {
    return song.name.toLowerCase().replace(/\s+/g, '').replaceAccents() + '-' + 
      song.autor.toLowerCase().replace(/\s+/g, '').replaceAccents();
  }
}

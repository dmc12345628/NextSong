import { Song } from './../../models/Song';
import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { SongService } from "../../services/song-service/song-service";

@Component({
  selector: 'page-songs',
  templateUrl: 'songs.html'
})
export class SongsPage {

  constructor(private navCtrl: NavController,
    private alertCtrl: AlertController,
    public _song: SongService) {
  }

  filterSongs(ev: any) {
    this._song.initializeSongs();

    const val = ev.target.value;

    if (val && val.trim() != '') {
      this._song.searching = true;

      this._song.songs = this._song.songs.filter((song) => {
        return (song.name + song.autor).toLowerCase().includes(val.toLowerCase());
      });
    } else {
      this._song.searching = false;
    }
  }

  showAddSongDialog() {
    const prompt = this.alertCtrl.create({
      title: 'Agregar canción',
      inputs: [
        {
          name: 'name',
          placeholder: 'Título'
        },
        {
          name: 'autor',
          placeholder: 'Autor'
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
            this._song.addSong(data);
          }
        }
      ]
    });
    prompt.present();
  }

  showDeleteSongDialog(song: Song) {
    const prompt = this.alertCtrl.create({
      title: 'Borrar canción',
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
          }
        },
        {
          text: 'Borrar',
          handler: data => {
            this._song.deleteSong(song);
          }
        }
      ]
    });
    prompt.present();
  }

  showPlaySongDialog(song: Song) {
    const prompt = this.alertCtrl.create({
      title: 'Tocar canción',
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
          }
        },
        {
          text: 'Aceptar',
          handler: data => {
            this._song.playSong(song);
            this.navCtrl.parent.select(0);
          }
        }
      ]
    });
    prompt.present();
  }
}

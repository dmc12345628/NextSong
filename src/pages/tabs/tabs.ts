import { Component } from '@angular/core';

import { MeetingsPage } from '../meetings/meetings';
import { ActualPage } from '../actual/actual';
import { SongsPage } from '../songs/songs';
import { MessagingService } from "../../services/messaging-service/messaging-service";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ActualPage;
  tab2Root = MeetingsPage;
  tab3Root = SongsPage;

  constructor(private _messaging: MessagingService) {

  }
}

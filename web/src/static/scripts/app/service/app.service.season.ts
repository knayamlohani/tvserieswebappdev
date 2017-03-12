/**
 * Created by mayanklohani on 12/03/17.
 */

import {Injectable, OnDestroy} from "@angular/core";
import {Subject} from "rxjs";

@Injectable()
export class SeasonService implements OnDestroy{
  toggleEpisodeIsActiveStatus = new Subject<string>();
  confirmToggleEpisodeIsActiveStatus = new Subject<string>();


  constructor() {
    //subscribes to toggleEpisodeIsActiveStatus and pushes to confirmToggleEpisodeIsActiveStatus
    this.toggleEpisodeIsActiveStatus.subscribe(
      dataString => {
        this.confirmToggleEpisodeIsActiveStatus.next(dataString);
      }
    )
  }


  ngOnDestroy(): void {
    this.toggleEpisodeIsActiveStatus.unsubscribe();
  }
}
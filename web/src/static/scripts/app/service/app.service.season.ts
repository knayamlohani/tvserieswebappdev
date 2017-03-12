/**
 * Created by mayanklohani on 12/03/17.
 */

import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable()
export class SeasonService {
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
}
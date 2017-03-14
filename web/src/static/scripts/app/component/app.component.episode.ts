/**
 * Created by mayanklohani on 11/03/17.
 */

import {Component, OnInit, Input, Output, EventEmitter, OnDestroy} from "@angular/core";
import {Episode} from "../model/app.model.episode";
import {LoggerService} from "../service/app.service.logger";
import {SeasonService} from "../service/app.service.season";
import {Subject, Subscription} from "rxjs";
import {DATE_CONSTANTS} from "../constant/app.constant.date_constants";

@Component({
  selector   : 'episode-component',
  templateUrl: 'views/app/component/app.component.episode.html',
  styleUrls  : ['styles/app/component/app.component.episode.css']
})
export class EpisodeComponent extends OnInit implements OnDestroy{
  @Input("seasonEpisode") episode: Episode;
  @Output("onEpisodeActivated") onEpisodeActivated = new EventEmitter();
  data: any;
  confirmToggleEpisodeIsActiveStatus: Subscription;
  DATE_CONSTANTS = DATE_CONSTANTS;

  constructor(private logger: LoggerService, private seasonService: SeasonService) {
    super();
    this.confirmToggleEpisodeIsActiveStatus = seasonService.confirmToggleEpisodeIsActiveStatus.subscribe(
      dataString => {
        this.data = JSON.parse(dataString);

        // if episode matches then sets its activation status with the one that is provided else sets it as false
        if(this.data.id == this.episode.id) {
          this.episode.isActivated = this.data.isActivated;
        } else {
          this.episode.isActivated = false
        }
      }
    )
  }


  ngOnInit(): void {
    this.episode.isActivated = false;
  }


  ngOnDestroy(): void {
    this.confirmToggleEpisodeIsActiveStatus.unsubscribe()
  }

  toggleIsActivatedStatus(): void {
    this.seasonService.toggleEpisodeIsActiveStatus.next(JSON.stringify({
      'id'         : this.episode.id,
      'isActivated': !this.episode.isActivated
    }))
  }
}
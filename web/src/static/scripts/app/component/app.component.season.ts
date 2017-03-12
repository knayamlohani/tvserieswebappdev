/**
 * Created by mayanklohani on 11/03/17.
 */

import {Component, OnInit, Input} from "@angular/core";
import {Season} from "../model/app.model.season";
import {LoggerService} from "../service/app.service.logger";
import {Episode} from "../model/app.model.episode";

@Component({
  selector   : 'season-component',
  templateUrl: 'views/app/component/app.component.season.html',
  styleUrls  : ['styles/app/component/app.component.season.css']
})
export class SeasonComponent extends OnInit {
  @Input("seriesSeason") season: Season;
  firstHalfEpisodes: Episode [];
  secondHalfEpisodes: Episode [];

  constructor(private logger: LoggerService) {
    super();
  }


  ngOnInit(): void {
    this.logger.info(this.season);
    this.firstHalfEpisodes  = this.season.episodes.slice(0, this.season.episodes.length / 2 + 1);
    this.secondHalfEpisodes = this.season.episodes.slice(this.season.episodes.length / 2 + 1, this.season.episodes.length)
  }

  onEpisodeActivated($event: Event) {
    this.logger.info(`episode activated ${JSON.stringify($event)}` )
  }
}
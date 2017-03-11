/**
 * Created by mayanklohani on 11/03/17.
 */

import {Component, OnInit} from "@angular/core";
import {Episode} from "../model/app.model.episode";
import {LoggerService} from "../service/app.service.logger";

@Component({
  selector   : 'episode-component',
  templateUrl: 'views/app/component/app.component.episode.html',
  styleUrls  : ['styles/app/component/app/component.episode.css']
})
export class EpisodeComponent extends OnInit{
  episode: Episode;

  constructor(private logger: LoggerService) {
    super();
  }


  ngOnInit(): void {
  }
}
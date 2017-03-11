/**
 * Created by mayanklohani on 11/03/17.
 */

import {Component, OnInit} from "@angular/core";
import {Season} from "../model/app.model.season";
import {LoggerService} from "../service/app.service.logger";

@Component({
  selector   : 'season-component',
  templateUrl: 'views/app/component/app.component.season.html',
  styleUrls  : ['styles/app/component/app.component.season.css']
})
export class SeasonComponent extends OnInit {
  season: Season;

  constructor(private logger: LoggerService) {
    super();
  }


  ngOnInit(): void {

  }
}
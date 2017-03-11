import {Component, OnInit} from '@angular/core';
import {TVSeriesService} from "../service/app.service.tvseries";
import {LoggerService} from "../service/app.service.logger";
import {Routes} from "@angular/router";
import {SearchComponent} from "./app.component.search";
import {TVSeriesComponent} from "./app.component.tv_series";

@Component({
  selector   : 'main-component',
  templateUrl: 'views/app/component/app.component.main.html',
  styleUrls  : []
})
export class MainComponent  extends OnInit{
  name = 'Angular';

  constructor(private tvSeriesService: TVSeriesService, private logger: LoggerService) {
    super()
  }

  ngOnInit() {
    this.logger.info("Main component initialized");
  }

  ngAfterViewChecked() {

  }
}

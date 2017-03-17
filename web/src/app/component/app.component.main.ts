import {Component, OnInit} from '@angular/core';
import {TVSeriesService} from "../service/app.service.tvseries";
import {LoggerService} from "../service/app.service.logger";

// css imports
import './app.component.main.sass'

@Component({
  selector   : 'main-component',
  templateUrl: './app.component.main.html',
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

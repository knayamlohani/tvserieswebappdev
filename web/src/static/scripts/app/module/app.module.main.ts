import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http'

import {MainComponent}  from '../component/app.component.main';
import {TVSeriesService} from "../service/app.service.tvseries";
import {HttpService} from "../service/app.service.http";
import {SearchComponent} from "../component/app.component.search";
import {FormsModule} from '@angular/forms';
import {AppHeaderComponent} from "../component/app.component.header";
import {LoggerService} from "../service/app.service.logger";
import {Routes, RouterModule} from "@angular/router";
import {TVSeriesComponent} from "../component/app.component.tv_series";
import {DataService} from "../service/app.service.data";
import {SeasonComponent} from "../component/app.component.season";
import {EpisodeComponent} from "../component/app.component.episode";
import {SeasonService} from "../service/app.service.season";
import {CastMemberComponent} from "../component/app.component.cast_member";
import {DatePipe} from "../pipe/pipe.pipe.date_pipe";


const routes: Routes  = [
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'tv_series',
    component: TVSeriesComponent
  },
  {
    path: '',
    redirectTo: '/search',
    pathMatch: 'full'
  }

];


@NgModule({
  imports:      [
    BrowserModule, RouterModule.forRoot(routes), HttpModule, FormsModule
  ],
  declarations: [
    MainComponent, AppHeaderComponent, SearchComponent,
    TVSeriesComponent, SeasonComponent, EpisodeComponent,
    CastMemberComponent, DatePipe
  ],
  bootstrap:    [ MainComponent ],
  providers:    [
    LoggerService ,HttpService, DataService,TVSeriesService, Location, SeasonService
  ]

})
export class AppModule { }

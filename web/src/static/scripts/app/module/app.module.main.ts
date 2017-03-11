import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http'

import {MainComponent}  from './app.component.main';
import {TVSeriesService} from "./services/app.service.tvseries";
import {HttpService} from "./services/app.service.http";
import {SearchComponent} from "./app.component.search";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports:      [ BrowserModule , HttpModule, FormsModule],
  declarations: [ MainComponent, SearchComponent ],
  bootstrap:    [ MainComponent ],
  providers:    [ HttpService, TVSeriesService ]

})
export class AppModule { }

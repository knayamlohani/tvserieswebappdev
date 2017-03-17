/**
 * Created by mayanklohani on 04/03/17.
 */

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './module/app.module.main';
import { enableProdMode } from "@angular/core";

enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);
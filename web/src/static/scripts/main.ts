/**
 * Created by mayanklohani on 04/03/17.
 */

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { enableProdMode } from "@angular/core";

// enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);
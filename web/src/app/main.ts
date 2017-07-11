/**
 * Created by mayanklohani on 04/03/17.
 */

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './module/app.module.main';
import { enableProdMode } from "@angular/core";

enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);



if( 'serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then((successResponse) => {
            console.log("service worker registered")
        })
        .catch((errorResponse) => {
            console.log("unable to register service worker")
        }
    )
}
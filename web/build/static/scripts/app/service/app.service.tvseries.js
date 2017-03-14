"use strict";var __decorate=this&&this.__decorate||function(e,t,r,i){var c,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,i);else for(var n=e.length-1;n>=0;n--)(c=e[n])&&(o=(s<3?c(o):s>3?c(t,r,o):c(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o},__metadata=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(exports,"__esModule",{value:!0});var app_service_http_1=require("./app.service.http"),core_1=require("@angular/core"),TVSeriesService=function(){function e(e){this.httpService=e}return e.prototype.getTVSeriesByName=function(e){var t=encodeURI("/service/tv_series_service/series?name="+e);return this.httpService.get({url:t})},e.prototype.getInfoForTVSeriesWithId=function(e){var t=encodeURI("/service/tv_series_service/series/"+e);return this.httpService.get({url:t})},e.prototype.getBannersForTVSeriesWithId=function(e){var t=encodeURI("/service/tv_series_service/series/"+e+"/banners");return this.httpService.get({url:t})},e.prototype.getCastForTVSeriesWithId=function(e){var t=encodeURI("/service/tv_series_service/series/"+e+"/cast");return this.httpService.get({url:t})},e}();TVSeriesService=__decorate([core_1.Injectable(),__metadata("design:paramtypes",[app_service_http_1.HttpService])],TVSeriesService),exports.TVSeriesService=TVSeriesService;
"use strict";var __extends=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])};return function(t,r){function i(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(i.prototype=r.prototype,new i)}}(),__decorate=this&&this.__decorate||function(e,t,r,i){var a,n=arguments.length,s=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,i);else for(var o=e.length-1;o>=0;o--)(a=e[o])&&(s=(n<3?a(s):n>3?a(t,r,s):a(t,r))||s);return n>3&&s&&Object.defineProperty(t,r,s),s},__metadata=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(exports,"__esModule",{value:!0});var core_1=require("@angular/core"),app_service_tvseries_1=require("../service/app.service.tvseries"),app_service_data_1=require("../service/app.service.data"),app_service_logger_1=require("../service/app.service.logger"),router_1=require("@angular/router"),common_1=require("@angular/common"),app_constant_tv_series_constants_1=require("../constant/app.constant.tv_series_constants"),TVSeriesComponent=function(e){function t(t,r,i,a,n){var s=e.call(this)||this;return s.tvSeriesService=t,s.dataService=r,s.logger=i,s.router=a,s.location=n,s.castMembers=[],s.TV_SERIES_RUNNING_STATUS=app_constant_tv_series_constants_1.TVSeriesRunningStatus,s.extraData={banner:"",fetchingBanners:"",banners:"",artwork:""},s}return __extends(t,e),t.prototype.ngOnInit=function(){this.tvSeries=this.dataService.tvSeries,this.storeExtraDataGeneratedDuringSearch(),this.getCastForSeriesWithId(this.tvSeries.id),this.getInfoForSeriesWithId(this.tvSeries.id)},t.prototype.storeExtraDataGeneratedDuringSearch=function(){this.extraData.banner=this.tvSeries.banner,this.extraData.artwork=this.tvSeries.artwork,this.extraData.banners=this.tvSeries.banners,this.extraData.fetchingBanners=this.tvSeries.fetchingBanners},t.prototype.addExtraDataGeneratedDuringSearchToTVSeries=function(){this.tvSeries.banner=this.extraData.banner,this.tvSeries.banners=this.extraData.banners,this.tvSeries.artwork=this.extraData.artwork,this.tvSeries.fetchingBanners=this.extraData.fetchingBanners},t.prototype.getInfoForSeriesWithId=function(e){var t=this;this.tvSeriesService.getInfoForTVSeriesWithId(e).subscribe(function(e){t.tvSeries=e,t.addExtraDataGeneratedDuringSearchToTVSeries(),t.logger.info(t.tvSeries)},function(e){})},t.prototype.getCastForSeriesWithId=function(e){var t=this;this.tvSeriesService.getCastForTVSeriesWithId(e).subscribe(function(e){t.castMembers=e,t.logger.info(t.castMembers)},function(e){})},t.prototype.exitTVSeriesComponent=function(){this.dataService.searchViewActivatedStatus=!1,this.router.navigate(["/search"])},t.prototype.loadSearchComponent=function(){this.dataService.searchViewActivatedStatus=!0,this.router.navigate(["/search"])},t}(core_1.OnInit);TVSeriesComponent=__decorate([core_1.Component({selector:"tv-series",templateUrl:"views/app/component/app.component.tv_series.html",styleUrls:["styles/app/component/app.component.tv_series.css"]}),__metadata("design:paramtypes",[app_service_tvseries_1.TVSeriesService,app_service_data_1.DataService,app_service_logger_1.LoggerService,router_1.Router,common_1.Location])],TVSeriesComponent),exports.TVSeriesComponent=TVSeriesComponent;
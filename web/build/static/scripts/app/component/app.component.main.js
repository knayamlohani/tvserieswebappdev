"use strict";var __extends=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])};return function(t,r){function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),__decorate=this&&this.__decorate||function(e,t,r,n){var o,i=arguments.length,c=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(c=(i<3?o(c):i>3?o(t,r,c):o(t,r))||c);return i>3&&c&&Object.defineProperty(t,r,c),c},__metadata=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(exports,"__esModule",{value:!0});var core_1=require("@angular/core"),app_service_tvseries_1=require("../service/app.service.tvseries"),app_service_logger_1=require("../service/app.service.logger"),MainComponent=function(e){function t(t,r){var n=e.call(this)||this;return n.tvSeriesService=t,n.logger=r,n.name="Angular",n}return __extends(t,e),t.prototype.ngOnInit=function(){this.logger.info("Main component initialized")},t.prototype.ngAfterViewChecked=function(){},t}(core_1.OnInit);MainComponent=__decorate([core_1.Component({selector:"main-component",templateUrl:"views/app/component/app.component.main.html",styleUrls:[]}),__metadata("design:paramtypes",[app_service_tvseries_1.TVSeriesService,app_service_logger_1.LoggerService])],MainComponent),exports.MainComponent=MainComponent;
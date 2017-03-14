"use strict";var __decorate=this&&this.__decorate||function(e,t,a,r){var n,o=arguments.length,c=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,a):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,a,r);else for(var i=e.length-1;i>=0;i--)(n=e[i])&&(c=(o<3?n(c):o>3?n(t,a,c):n(t,a))||c);return o>3&&c&&Object.defineProperty(t,a,c),c},__metadata=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(exports,"__esModule",{value:!0});var core_1=require("@angular/core"),app_constant_date_constants_1=require("../constant/app.constant.date_constants"),app_service_logger_1=require("../service/app.service.logger"),DatePipe=function(){function e(e){this.logger=e,this.monthNames=["January","February","March","April","May","June","July","August","September","October","November","December"]}return e.prototype.transform=function(e,t){try{switch(e=new Date(e),this.logger.info(e+", "+t+", "+app_constant_date_constants_1.DATE_CONSTANTS.SHORT_DATE),t){case app_constant_date_constants_1.DATE_CONSTANTS.SHORT_DATE:return this.monthNames[e.getMonth()].slice(0,3)+" "+e.getDate()+", "+e.getFullYear();default:return e}}catch(e){throw new Error("Please provide a valid date/date string")}},e}();DatePipe=__decorate([core_1.Pipe({name:"datePipe"}),__metadata("design:paramtypes",[app_service_logger_1.LoggerService])],DatePipe),exports.DatePipe=DatePipe;
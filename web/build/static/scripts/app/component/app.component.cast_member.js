"use strict";var __extends=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o])};return function(t,o){function r(){this.constructor=t}e(t,o),t.prototype=null===o?Object.create(o):(r.prototype=o.prototype,new r)}}(),__decorate=this&&this.__decorate||function(e,t,o,r){var n,a=arguments.length,c=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,o,r);else for(var p=e.length-1;p>=0;p--)(n=e[p])&&(c=(a<3?n(c):a>3?n(t,o,c):n(t,o))||c);return a>3&&c&&Object.defineProperty(t,o,c),c},__metadata=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(exports,"__esModule",{value:!0});var core_1=require("@angular/core"),app_model_cast_member_1=require("../model/app.model.cast_member"),app_service_logger_1=require("../service/app.service.logger"),CastMemberComponent=function(e){function t(t){var o=e.call(this)||this;return o.logger=t,o}return __extends(t,e),t.prototype.ngOnInit=function(){},t}(core_1.OnInit);__decorate([core_1.Input("tvSeriesCastMember"),__metadata("design:type",app_model_cast_member_1.CastMember)],CastMemberComponent.prototype,"castMember",void 0),CastMemberComponent=__decorate([core_1.Component({selector:"cast-member-component",templateUrl:"views/app/component/app.component.cast_member.html",styleUrls:["styles/app/component/app.component.cast_member.css"]}),__metadata("design:paramtypes",[app_service_logger_1.LoggerService])],CastMemberComponent),exports.CastMemberComponent=CastMemberComponent;
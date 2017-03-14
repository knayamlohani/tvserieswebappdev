"use strict";var __decorate=this&&this.__decorate||function(e,t,r,o){var a,n=arguments.length,s=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,o);else for(var p=e.length-1;p>=0;p--)(a=e[p])&&(s=(n<3?a(s):n>3?a(t,r,s):a(t,r))||s);return n>3&&s&&Object.defineProperty(t,r,s),s},__metadata=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(exports,"__esModule",{value:!0});var http_1=require("@angular/http"),rxjs_1=require("rxjs");require("rxjs/add/operator/catch"),require("rxjs/add/operator/map");var core_1=require("@angular/core"),HttpService=function(){function e(e){this.http=e}return e.prototype.get=function(e){return this.http.get(e.url).map(this.handleSuccessResponse).catch(this.handleErrorResponse)},e.prototype.post=function(e){var t=new http_1.Headers({"Content-Type":"application/json"}),r=new http_1.RequestOptions({headers:t});return this.http.post(e.url,e.body,r).map(this.handleSuccessResponse).catch(this.handleErrorResponse)},e.prototype.handleSuccessResponse=function(e){var t=e.json();return t.data||{}},e.prototype.handleErrorResponse=function(e,t){var r=e.json();return rxjs_1.Observable.throw(r.data)},e}();HttpService=__decorate([core_1.Injectable(),__metadata("design:paramtypes",[http_1.Http])],HttpService),exports.HttpService=HttpService;
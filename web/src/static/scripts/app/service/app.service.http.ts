/**
 * Created by mayanklohani on 06/03/17.
 */


import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from "rxjs";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Injectable} from "@angular/core";


@Injectable()
export class HttpService {

    constructor(private http: Http) {
    }

    get(options: any): Observable<Object> {
        return this.http
            .get(options.url)
            .map(this.handleSuccessResponse)
            .catch(this.handleErrorResponse);
    }

    post(options: any): Observable<any> {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let requestOptions = new RequestOptions({ headers: headers });

        return this.http
            .post(options.url, options.body, requestOptions)
            .map(this.handleSuccessResponse)
            .catch(this.handleErrorResponse);
    }


    private handleSuccessResponse(response: Response) {
        let jsonResponse = response.json();
        return jsonResponse.data || {};

    }

    private handleErrorResponse(errorResponse: any, caught: Observable<any>) {
        // var responseObject = {};
        // if (response instanceof Response) {
        //     responseObject = response
        // } else {
        // }



        let jsonResponse = errorResponse.json();
        return Observable.throw(jsonResponse.data);

    }
}
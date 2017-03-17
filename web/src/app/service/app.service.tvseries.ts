/**
 * Created by mayanklohani on 07/03/17.
 */

import {HttpService} from './app.service.http'
import {Injectable} from "@angular/core";

@Injectable()
export class TVSeriesService {

    constructor(private httpService: HttpService) {}

    getTVSeriesByName(name: string) {
        let url = encodeURI(`/service/tv_series_service/series?name=${name}`);
        return this.httpService.get({
            'url': url
        })
    }


    getInfoForTVSeriesWithId(id: string) {
        let url = encodeURI(`/service/tv_series_service/series/${id}`);
        return this.httpService.get({
            'url': url
        })
    }


    getBannersForTVSeriesWithId(id: string) {
        let url = encodeURI(`/service/tv_series_service/series/${id}/banners`);
        return this.httpService.get({
            'url': url
        })
    }

    getCastForTVSeriesWithId(id: string) {
        let url = encodeURI(`/service/tv_series_service/series/${id}/cast`);
        return this.httpService.get({
            'url': url
        })
    }
}
/**
 * Created by mayanklohani on 09/03/17.
 */

import {Component, OnInit} from "@angular/core";
import {TVSeries} from "../model/app.model.tv_series";
import {TVSeriesService} from "../service/app.service.tvseries";
import {DataService} from "../service/app.service.data";
import {LoggerService} from "../service/app.service.logger";
import {Router} from "@angular/router";
import {Location} from  "@angular/common"
import {CastMember} from "../model/app.model.cast_member";
import {TVSeriesRunningStatus} from "../constant/app.constant.tv_series_constants"

@Component({
  selector   : 'tv-series',
  templateUrl: 'views/app/component/app.component.tv_series.html',
  styleUrls  : [
    'styles/app/component/app.component.tv_series.css'
  ]
})
export class TVSeriesComponent extends OnInit{
  tvSeries: TVSeries;
  castMembers: CastMember [] = [] as Array<CastMember>;
  TV_SERIES_RUNNING_STATUS:any = TVSeriesRunningStatus;
  extraData:any =  {
    banner: '',
    fetchingBanners: '',
    banners: '',
    artwork: ''
  };


  constructor(private tvSeriesService: TVSeriesService, private dataService: DataService,
              private logger: LoggerService, private router: Router,
              private location: Location) {
    super();
  }

  ngOnInit(): void {
    this.tvSeries = this.dataService.tvSeries;
    this.storeExtraDataGeneratedDuringSearch();
    this.getCastForSeriesWithId(this.tvSeries.id)
    this.getInfoForSeriesWithId(this.tvSeries.id);
  }

  storeExtraDataGeneratedDuringSearch() {
    this.extraData.banner = this.tvSeries.banner;
    this.extraData.artwork = this.tvSeries.artwork;
    this.extraData.banners = this.tvSeries.banners;
    this.extraData.fetchingBanners = this.tvSeries.fetchingBanners;
  }

  addExtraDataGeneratedDuringSearchToTVSeries() {
    this.tvSeries.banner = this.extraData.banner;
    this.tvSeries.banners = this.extraData.banners;
    this.tvSeries.artwork = this.extraData.artwork;
    this.tvSeries.fetchingBanners = this.extraData.fetchingBanners
  }




  getInfoForSeriesWithId(id: string): void {
    this.tvSeriesService
      .getInfoForTVSeriesWithId(id).subscribe(
        (data)  => {
          this.tvSeries = <TVSeries>data;
          this.addExtraDataGeneratedDuringSearchToTVSeries();
          this.logger.info(this.tvSeries);
        },
        (error) => {}
    );
  }

  getCastForSeriesWithId(id: string): void {
    this.tvSeriesService
      .getCastForTVSeriesWithId(id).subscribe(
        (data)  => {
          this.castMembers = data as Array<CastMember>;
          this.logger.info(this.castMembers);
        },
        (error) => {}
      )
  }

  exitTVSeriesComponent(): void {
    this.dataService.searchViewActivatedStatus = false;
    this.router.navigate(['/search']);
  }

  loadSearchComponent(): void {
    this.dataService.searchViewActivatedStatus = true;
    this.router.navigate(['/search'])
  }
}
/**
 * Created by mayanklohani on 07/03/17.
 */

import {Component, OnInit} from "@angular/core";
import {TVSeriesService} from "../service/app.service.tvseries";
import {LoggerService} from "../service/app.service.logger";
import {TVSeries} from "../model/app.model.tv_series";
import {Banner} from "../model/app.model.banner";
import {Router} from "@angular/router";
import {DataService} from "../service/app.service.data";
import {Location} from "@angular/common";

@Component({
  // moduleId: module.id,
  selector   : 'search-component',
  templateUrl: 'views/app/component/app.component.search.html',
  styleUrls  : ['styles/app/component/app.component.search.css']
})
export class SearchComponent extends OnInit{
  name: string = "";
  info: string = "";
  searchViewActivatedStatus: boolean = false;
  tvShows: TVSeries [] = [] as Array<TVSeries>;
  fetchingTVShows: boolean = false;

  constructor(private tvSeriesService: TVSeriesService, private logger: LoggerService,
              private router: Router, private dataService: DataService,
              private location: Location) {
      super();
  }

  ngOnInit() {
    this.resetComponentData();
    if(this.dataService.searchViewActivatedStatus) {
      this.activateSearchView();
    }
  }

  resetComponentData() {
    this.name = "";
    this.info = "";
    this.searchViewActivatedStatus = false;
    this.tvShows = [] as Array<TVSeries>;
    this.fetchingTVShows = false;
  }

  activateSearchView() {
    this.logger.info("activate search view");
    this.searchViewActivatedStatus = true;
  }

  searchTVSeries() {
    this.searchViewActivatedStatus = true;
    this.name = this.name.trim();
    this.logger.info(`search tv series: ${this.name}`);

    if(this.name) {
      this.tvShows = [] as Array<TVSeries>;
      this.info = "";
      this.fetchingTVShows = true;
      this.tvSeriesService
        .getTVSeriesByName(this.name)
        .subscribe(
          (data) => {
            this.fetchingTVShows = false;
            this.tvShows = data as Array<TVSeries>;
            // this.logger.info(this.tvShows);

            if (this.tvShows.length == 0) {
              this.info = "Unable to find tv shows matching your request"
            } else {
              for (var tvShow of this.tvShows) {
                ((tvShow) => {
                  tvShow.fetchingBanners = true;
                  this.tvSeriesService.getBannersForTVSeriesWithId(tvShow.id).subscribe(
                    (data) => {
                      // this.logger.info(data);
                      tvShow.banners = data as Array<Banner>;
                      for (let banner of tvShow.banners) {
                        if (banner.type == 'poster') {
                          tvShow.artwork = banner.url;
                          break;
                        }
                      }
                      tvShow.fetchingBanners = false;
                    },
                    (error) => {
                      tvShow.fetchingBanners = false;
                    }
                  )
                })(tvShow)
              }
            }

          },
          (error) => {
            this.fetchingTVShows = false;
            this.logger.error(error);
            this.info = "Unable to fetch tv shows matching your request due to some unexpected error."
          }
        );
    }
  }


  loadTVSeries(tvShow: TVSeries) {
    this.dataService.tvSeries = tvShow;
    this.router.navigate(['/tv_series'])
  }

  exitSearchComponent() {
    this.dataService.searchViewActivatedStatus = false;
    this.resetComponentData();
    this.router.navigate(['/']);
  }
}
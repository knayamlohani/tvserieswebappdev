/**
 * Created by mayanklohani on 09/03/17.
 */

import {TVSeries} from "../model/app.model.tv_series";
import {Injectable} from "@angular/core";


@Injectable()
export class DataService {
  private _tvSeries: TVSeries;
  private _searchViewActivatedStatus: boolean = false;

  constructor() {
  }

  get tvSeries(): TVSeries {
    return this._tvSeries;
  }

  set tvSeries(value: TVSeries) {
    this._tvSeries = value;
  }

  get searchViewActivatedStatus(): boolean {
    return this._searchViewActivatedStatus;
  }

  set searchViewActivatedStatus(value: boolean) {
    this._searchViewActivatedStatus = value;
  }
}
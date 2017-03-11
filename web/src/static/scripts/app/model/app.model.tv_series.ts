import {Banner} from "./app.model.banner";
import {Season} from "./app.model.season";
/**
 * Created by mayanklohani on 08/03/17.
 */

export class TVSeries {

  private _id: string;
  private _actors: [string];
  // actorsDetails: [];
  private _airsOnDayOfWeek: string;
  private _airsAtTime: string;
  private _contentRating: string;
  private _banner: string; //extra to be copied
  private _firstAired: string;
  private _genre: string;
  private _imdbId: string;
  private _language: string;
  private _name: string;
  private _network: string;
  private _networkId: string;
  private _overview: string;
  private _rating: string;
  private _ratingCount: string;
  private _runningStatus: string;
  private _added: string;
  private _addedBy: string;
  private _bannerUrl: string;
  private _fanartUrl: string ;
  private _lastUpdated: string;
  private _poster: string;
  private _zap2itId: string;
  private _seasons: Season [] = [] as Array<Season>;

  private _fetchingBanners: boolean = false; // to be copied
  private _banners: Banner [] = [] as Array<Banner>; // to be copied
  private _artwork: string; // to be copied

  constructor() {

  }


  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get actors(): [string] {
    return this._actors;
  }

  set actors(value: [string]) {
    this._actors = value;
  }

  get airsOnDayOfWeek(): string {
    return this._airsOnDayOfWeek;
  }

  set airsOnDayOfWeek(value: string) {
    this._airsOnDayOfWeek = value;
  }

  get airsAtTime(): string {
    return this._airsAtTime;
  }

  set airsAtTime(value: string) {
    this._airsAtTime = value;
  }

  get contentRating(): string {
    return this._contentRating;
  }

  set contentRating(value: string) {
    this._contentRating = value;
  }

  get banner(): string {
    return this._banner;
  }

  set banner(value: string) {
    this._banner = value;
  }

  get firstAired(): string {
    return this._firstAired;
  }

  set firstAired(value: string) {
    this._firstAired = value;
  }

  get genre(): string {
    return this._genre;
  }

  set genre(value: string) {
    this._genre = value;
  }

  get imdbId(): string {
    return this._imdbId;
  }

  set imdbId(value: string) {
    this._imdbId = value;
  }

  get language(): string {
    return this._language;
  }

  set language(value: string) {
    this._language = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get network(): string {
    return this._network;
  }

  set network(value: string) {
    this._network = value;
  }

  get networkId(): string {
    return this._networkId;
  }

  set networkId(value: string) {
    this._networkId = value;
  }

  get overview(): string {
    return this._overview;
  }

  set overview(value: string) {
    this._overview = value;
  }

  get rating(): string {
    return this._rating;
  }

  set rating(value: string) {
    this._rating = value;
  }

  get ratingCount(): string {
    return this._ratingCount;
  }

  set ratingCount(value: string) {
    this._ratingCount = value;
  }

  get runningStatus(): string {
    return this._runningStatus;
  }

  set runningStatus(value: string) {
    this._runningStatus = value;
  }

  get added(): string {
    return this._added;
  }

  set added(value: string) {
    this._added = value;
  }

  get addedBy(): string {
    return this._addedBy;
  }

  set addedBy(value: string) {
    this._addedBy = value;
  }

  get bannerUrl(): string {
    return this._bannerUrl;
  }

  set bannerUrl(value: string) {
    this._bannerUrl = value;
  }

  get fanartUrl(): string {
    return this._fanartUrl;
  }

  set fanartUrl(value: string) {
    this._fanartUrl = value;
  }

  get lastUpdated(): string {
    return this._lastUpdated;
  }

  set lastUpdated(value: string) {
    this._lastUpdated = value;
  }

  get poster(): string {
    return this._poster;
  }

  set poster(value: string) {
    this._poster = value;
  }

  get zap2itId(): string {
    return this._zap2itId;
  }

  set zap2itId(value: string) {
    this._zap2itId = value;
  }

  get seasons(): Season[] {
    return this._seasons;
  }

  set seasons(value: Season[]) {
    this._seasons = value;
  }

  get fetchingBanners(): boolean {
    return this._fetchingBanners;
  }

  set fetchingBanners(value: boolean) {
    this._fetchingBanners = value;
  }

  get banners(): Banner[] {
    return this._banners;
  }

  set banners(value: Banner[]) {
    this._banners = value;
  }

  get artwork(): string {
    return this._artwork;
  }

  set artwork(value: string) {
    this._artwork = value;
  }
}

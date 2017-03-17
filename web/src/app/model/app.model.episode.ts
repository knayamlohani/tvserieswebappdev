/**
 * Created by mayanklohani on 10/03/17.
 */


export class Episode {
  private _id: string;
  private _name: string;
  private _number: string;
  private _language: string;
  private _airDate: string;
  private _guestStars: string;
  private _imdbId: string;
  private _director: string;
  private _combinedEpisodeNumber: string;
  private _combinedSeason: string;
  private _dvdChapter: string;
  private _dvdDiscId: string;
  private _dvdEpisodeNumber: string;
  private _dvdSeason: string;
  private _epImgFlag: string;
  private _overview: string;
  private _productionCode: string;
  private _rating: string;
  private _ratingCount: string;
  private _season: string;
  private _writer: string;
  private _absoluteNumber: string;
  private _airsAfterSeason: string;
  private _airsBeforeSeason: string;
  private _airsBeforeEpisode: string;
  private _thumbnailUrl: string;
  private _lastUpdated: string;
  private _seasonId: string;
  private _seriesId: string;
  private _thumbnailAdded: string;
  private _thumbnailResultion: string;
  private _isActivated: boolean = false;


  constructor() {
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get number(): string {
    return this._number;
  }

  set number(value: string) {
    this._number = value;
  }

  get language(): string {
    return this._language;
  }

  set language(value: string) {
    this._language = value;
  }

  get airDate(): string {
    return this._airDate;
  }

  set airDate(value: string) {
    this._airDate = value;
  }

  get guestStars(): string {
    return this._guestStars;
  }

  set guestStars(value: string) {
    this._guestStars = value;
  }

  get imdbId(): string {
    return this._imdbId;
  }

  set imdbId(value: string) {
    this._imdbId = value;
  }

  get director(): string {
    return this._director;
  }

  set director(value: string) {
    this._director = value;
  }

  get combinedEpisodeNumber(): string {
    return this._combinedEpisodeNumber;
  }

  set combinedEpisodeNumber(value: string) {
    this._combinedEpisodeNumber = value;
  }

  get combinedSeason(): string {
    return this._combinedSeason;
  }

  set combinedSeason(value: string) {
    this._combinedSeason = value;
  }

  get dvdChapter(): string {
    return this._dvdChapter;
  }

  set dvdChapter(value: string) {
    this._dvdChapter = value;
  }

  get dvdDiscId(): string {
    return this._dvdDiscId;
  }

  set dvdDiscId(value: string) {
    this._dvdDiscId = value;
  }

  get dvdEpisodeNumber(): string {
    return this._dvdEpisodeNumber;
  }

  set dvdEpisodeNumber(value: string) {
    this._dvdEpisodeNumber = value;
  }

  get dvdSeason(): string {
    return this._dvdSeason;
  }

  set dvdSeason(value: string) {
    this._dvdSeason = value;
  }

  get epImgFlag(): string {
    return this._epImgFlag;
  }

  set epImgFlag(value: string) {
    this._epImgFlag = value;
  }

  get overview(): string {
    return this._overview;
  }

  set overview(value: string) {
    this._overview = value;
  }

  get productionCode(): string {
    return this._productionCode;
  }

  set productionCode(value: string) {
    this._productionCode = value;
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

  get season(): string {
    return this._season;
  }

  set season(value: string) {
    this._season = value;
  }

  get writer(): string {
    return this._writer;
  }

  set writer(value: string) {
    this._writer = value;
  }

  get absoluteNumber(): string {
    return this._absoluteNumber;
  }

  set absoluteNumber(value: string) {
    this._absoluteNumber = value;
  }

  get airsAfterSeason(): string {
    return this._airsAfterSeason;
  }

  set airsAfterSeason(value: string) {
    this._airsAfterSeason = value;
  }

  get airsBeforeSeason(): string {
    return this._airsBeforeSeason;
  }

  set airsBeforeSeason(value: string) {
    this._airsBeforeSeason = value;
  }

  get airsBeforeEpisode(): string {
    return this._airsBeforeEpisode;
  }

  set airsBeforeEpisode(value: string) {
    this._airsBeforeEpisode = value;
  }

  get thumbnailUrl(): string {
    return this._thumbnailUrl;
  }

  set thumbnailUrl(value: string) {
    this._thumbnailUrl = value;
  }

  get lastUpdated(): string {
    return this._lastUpdated;
  }

  set lastUpdated(value: string) {
    this._lastUpdated = value;
  }

  get seasonId(): string {
    return this._seasonId;
  }

  set seasonId(value: string) {
    this._seasonId = value;
  }

  get seriesId(): string {
    return this._seriesId;
  }

  set seriesId(value: string) {
    this._seriesId = value;
  }

  get thumbnailAdded(): string {
    return this._thumbnailAdded;
  }

  set thumbnailAdded(value: string) {
    this._thumbnailAdded = value;
  }

  get thumbnailResultion(): string {
    return this._thumbnailResultion;
  }

  set thumbnailResultion(value: string) {
    this._thumbnailResultion = value;
  }


  get isActivated(): boolean {
    return this._isActivated;
  }

  set isActivated(value: boolean) {
    this._isActivated = value;
  }
}
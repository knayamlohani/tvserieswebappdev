/**
 * Created by mayanklohani on 08/03/17.
 */

export class Banner {
  colors: string;
  id: string;
  language: string;
  rating: string;
  ratingCount: string;
  resolution: string;
  seriesName: string;
  thumbnailUrl: string;
  type: string;
  url: string;
  vignetteUrl: string;


  constructor(colors: string, id: string, language: string, rating: string, ratingCount: string, resolution: string, seriesName: string, thumbnailUrl: string, type: string, url: string, vignetteUrl: string) {
    this.colors = colors;
    this.id = id;
    this.language = language;
    this.rating = rating;
    this.ratingCount = ratingCount;
    this.resolution = resolution;
    this.seriesName = seriesName;
    this.thumbnailUrl = thumbnailUrl;
    this.type = type;
    this.url = url;
    this.vignetteUrl = vignetteUrl;
  }
}
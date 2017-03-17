/**
 * Created by mayanklohani on 10/03/17.
 */

import {Episode} from "./app.model.episode";

export class Season {
  private _number: string;
  private _episodes: Episode [] = [] as Array<Episode>;

  constructor() {
  }


  get number(): string {
    return this._number;
  }

  set number(value: string) {
    this._number = value;
  }

  get episodes(): Episode[] {
    return this._episodes;
  }

  set episodes(value: Episode[]) {
    this._episodes = value;
  }

}
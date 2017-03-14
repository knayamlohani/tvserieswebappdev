/**
 * Created by mayanklohani on 11/03/17.
 */

export class CastMember {

  private _id: string;
  private _imageUrl: string;
  private _name: string;
  private _role: string;
  private _sortOrder: string;


  constructor() {
  }


  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get imageUrl(): string {
    return this._imageUrl;
  }

  set imageUrl(value: string) {
    this._imageUrl = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get role(): string {
    return this._role;
  }

  set role(value: string) {
    this._role = value;
  }

  get sortOrder(): string {
    return this._sortOrder;
  }

  set sortOrder(value: string) {
    this._sortOrder = value;
  }
}
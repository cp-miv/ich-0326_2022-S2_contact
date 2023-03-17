import { EntityBase } from './entity.base';

export class AddressEntity extends EntityBase {
  protected _street!: string;
  protected _number!: string;
  protected _city!: string;
  protected _zip!: number;

  constructor(params?: {
    id?: number;
    street: string;
    number: string;
    city: string;
    zip: number;
  }) {
    super({ id: params?.id });

    this.street = params?.street ?? AddressEntity.DefaultStreet;
    this.number = params?.number ?? AddressEntity.DefaultNumber;
    this.city = params?.city ?? AddressEntity.DefaultCity;
    this.zip = params?.zip ?? AddressEntity.DefaultZip;
  }

  /**
   * Public methods
   */

  public clone(): AddressEntity {
    return new AddressEntity(this);
  }

  /**
   * Getters / Setters
   */

  public get street(): string {
    return this._street;
  }

  public set street(value: string) {
    this._street = value;
  }

  public get number(): string {
    return this._number;
  }

  public set number(value: string) {
    this._number = value;
  }

  public get city(): string {
    return this._city;
  }

  public set city(value: string) {
    this._city = value;
  }

  public get zip(): number {
    return this._zip;
  }

  public set zip(value: number) {
    if (value < 0) return;

    this._zip = value;
  }

  /**
   * Const / Static fields
   */

  static readonly DefaultStreet: string = 'Rue inconnu';
  static readonly DefaultNumber: string = 'Numéro inconnu';
  static readonly DefaultCity: string = 'Ville inconnu';
  static readonly DefaultZip: number = 0;
}

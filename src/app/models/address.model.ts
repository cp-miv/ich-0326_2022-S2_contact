import { ModelBase } from './model.base';

export class AddressModel extends ModelBase {
  public streetAddress: string;
  public numberAddress: string;
  public cityAddress: string;
  public zipAddress: number;

  constructor(params: {
    id?: number;
    streetAddress: string;
    numberAddress: string;
    cityAddress: string;
    zipAddress: number;
  }) {
    super({ id: params?.id });

    this.streetAddress = params.streetAddress;
    this.numberAddress = params.numberAddress;
    this.cityAddress = params.cityAddress;
    this.zipAddress = params.zipAddress;
  }
}

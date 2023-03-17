import { Injectable } from '@angular/core';
import { AddressEntity } from '../entities/address.entity';
import { EntityBase } from '../entities/entity.base';
import { AddressModel } from '../models/address.model';
import { ModelBase } from '../models/model.base';
import { MapperBase } from './mapper.base';

@Injectable({
  providedIn: 'root',
})
export class AddressMapper extends MapperBase<AddressEntity, AddressModel> {
  public assignFromEntity(entity: AddressEntity, model: AddressModel): void {
    model.streetAddress = entity.street;
    model.numberAddress = entity.number;
    model.cityAddress = entity.city;
    model.zipAddress = entity.zip;
  }

  public assignFromModel(model: AddressModel, entity: AddressEntity): void {
    entity.street = model.streetAddress;
    entity.number = model.numberAddress;
    entity.city = model.cityAddress;
    entity.zip = model.zipAddress;
  }

  public mapFromEntity(entity: AddressEntity): AddressModel {
    return new AddressModel({
      id: entity.id,
      streetAddress: entity.street,
      numberAddress: entity.number,
      cityAddress: entity.city,
      zipAddress: entity.zip,
    });
  }

  public mapFromModel(model: AddressModel): AddressEntity {
    return new AddressEntity({
      id: model.id,
      street: model.streetAddress,
      number: model.numberAddress,
      city: model.cityAddress,
      zip: model.zipAddress,
    });
  }
}

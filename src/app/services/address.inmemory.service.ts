import { Injectable } from '@angular/core';
import { AddressEntity } from '../entities/address.entity';
import { AddressModel } from '../models/address.model';
import { InMemoryService } from './inmemory.service';

@Injectable({
  providedIn: 'root',
})
export class AddressInMemoryService extends InMemoryService<
  AddressEntity,
  AddressModel
> {
  constructor(mapper: MapperBase<AddressEntity, AddressModel>) {
    super(mapper);

    this.models = [
      new AddressModel({
        id: 1,
        streetAddress: 'Wall street',
        numberAddress: '23',
        cityAddress: 'New York',
        zipAddress: 24767,
      }),
    ];
  }
}

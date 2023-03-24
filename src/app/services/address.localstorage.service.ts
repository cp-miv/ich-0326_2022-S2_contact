import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AddressEntity } from '../entities/address.entity';
import { MapperBase } from '../mappers/mapper.base';
import { AddressModel } from '../models/address.model';
import { BrowserStorageService } from './browserstorage.service';

@Injectable({
  providedIn: 'root',
})
export class AddressLocalStorageService extends BrowserStorageService<
  AddressEntity,
  AddressModel
> {
  constructor(mapper: MapperBase<AddressEntity, AddressModel>) {
    super(mapper, window.localStorage);
  }
}

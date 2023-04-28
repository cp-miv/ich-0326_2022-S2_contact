import { Injectable } from '@angular/core';
import { AddressEntity } from '../entities/address.entity';
import { AddressModel } from '../models/address.model';
import { ServiceBase } from './service.base';
import { IMapper } from '../mappers/imapper';
import { IRepository } from '../repositories/irepository';

@Injectable({
  providedIn: 'root',
})
export class AddressService extends ServiceBase<AddressEntity, AddressModel> {
  constructor(
    mapper: IMapper<AddressEntity, AddressModel>,
    repository: IRepository<AddressModel>
  ) {
    super(mapper, repository);
  }
}

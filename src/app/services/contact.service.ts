import { Injectable } from '@angular/core';
import { ContactEntity } from '../entities/contact.entity';
import { ContactModel } from '../models/contact.model';
import { ServiceBase } from './service.base';
import { IRepository } from '../repositories/irepository';
import { IMapper } from '../mappers/imapper';

@Injectable({
  providedIn: 'root',
})
export class ContactService extends ServiceBase<ContactEntity, ContactModel> {
  constructor(
    mapper: IMapper<ContactEntity, ContactModel>,
    repository: IRepository<ContactModel>
  ) {
    super(mapper, repository);
  }
}

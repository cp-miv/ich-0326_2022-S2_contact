import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { ContactEntity } from '../entities/contact.entity';
import { ContactMapper } from '../mappers/contact.mapper';
import { MapperBase } from '../mappers/mapper.base';
import { ContactModel } from '../models/contact.model';
import { ContactService } from './contact.service';
import { LocalStorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class ContactLocalStorageService extends LocalStorageService<
  ContactEntity,
  ContactModel
> {
  constructor(mapper: MapperBase<ContactEntity, ContactModel>) {
    super(mapper);
  }
}

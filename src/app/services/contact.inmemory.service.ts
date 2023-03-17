import { Injectable } from '@angular/core';
import { ContactEntity } from '../entities/contact.entity';
import { ContactMapper } from '../mappers/contact.mapper';
import { ContactModel } from '../models/contact.model';
import { InMemoryService } from './inmemory.service';

@Injectable({
  providedIn: 'root',
})
export class ContactInMemoryService extends InMemoryService<
  ContactEntity,
  ContactModel
> {
  protected contacts: ContactModel[];

  constructor(mapper: MapperBase<ContactEntity, ContactModel>) {
    super(mapper);

    this.contacts = [
      new ContactModel({
        id: 1,
        firstnameContact: 'Aline',
        lastnameContact: 'Dupont',
        ageContact: 21,
      }),
      new ContactModel({
        id: 2,
        firstnameContact: 'Benjamin',
        lastnameContact: 'Lambert',
        ageContact: 32,
      }),
      new ContactModel({
        id: 3,
        firstnameContact: 'Claudia',
        lastnameContact: 'Mercier',
        ageContact: 43,
      }),
      new ContactModel({
        id: 4,
        firstnameContact: 'Daniel',
        lastnameContact: 'Chevalier',
        ageContact: 54,
      }),
    ];
  }
}

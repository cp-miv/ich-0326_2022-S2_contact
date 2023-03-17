import { Injectable } from '@angular/core';
import { ContactEntity } from '../entities/contact.entity';
import { ContactModel } from '../models/contact.model';
import { MapperBase } from './mapper.base';

@Injectable({
  providedIn: 'root',
})
export class ContactMapper extends MapperBase<ContactEntity, ContactModel> {
  public assignFromEntity(entity: ContactEntity, model: ContactModel): void {
    model.firstnameContact = entity.firstname;
    model.lastnameContact = entity.lastname;
    model.ageContact = entity.age;
  }

  public assignFromModel(model: ContactModel, entity: ContactEntity): void {
    entity.firstname = model.firstnameContact;
    entity.lastname = model.lastnameContact;
    entity.age = model.ageContact;
  }

  public mapFromEntity(entity: ContactEntity): ContactModel {
    return new ContactModel({
      id: entity.id,
      firstnameContact: entity.firstname,
      lastnameContact: entity.lastname,
      ageContact: entity.age,
    });
  }

  public mapFromModel(model: ContactModel): ContactEntity {
    return new ContactEntity({
      id: model.id,
      firstname: model.firstnameContact,
      lastname: model.lastnameContact,
      age: model.ageContact,
    });
  }
}

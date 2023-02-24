import { Directive, Injectable } from '@angular/core';
import { ContactEntity } from '../entities/contact.entity';
import { ContactModel } from '../models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactMapper {
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

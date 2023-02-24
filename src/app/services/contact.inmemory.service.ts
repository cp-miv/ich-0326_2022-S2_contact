import { Injectable } from '@angular/core';
import { ContactEntity } from '../entities/contact.entity';
import { ContactMapper } from '../mappers/contact.mapper';
import { ContactModel } from '../models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactInMemoryService {
  protected contacts: ContactModel[];

  constructor(private mapper: ContactMapper) {
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

  public getAll(): ContactEntity[] {
    return this.contacts.map(this.mapper.mapFromModel);
  }

  public get(id: number): ContactEntity {
    const { model } = this.internalGet(id);

    return this.mapper.mapFromModel(model);
  }

  public add(entity: ContactEntity): ContactEntity {
    const id: number = Math.max(0, ...this.contacts.map((x) => x.id!)) + 1;

    const model: ContactModel = this.mapper.mapFromEntity(entity);
    model.id = id;
    this.contacts.push(model);

    return this.mapper.mapFromModel(model);
  }

  public update(entity: ContactEntity): void {
    const { index, model } = this.internalGet(entity.id);

    model.firstnameContact = entity.firstname;
    model.lastnameContact = entity.lastname;
    model.ageContact = entity.age;

    this.contacts[index] = model;
  }

  public remove(model: ContactEntity): void {
    let { index } = this.internalGet(model.id);

    this.contacts.splice(index, 1);
  }

  protected internalGet(id: number): {
    index: number;
    model: ContactModel;
  } {
    const index: number = this.contacts.findIndex((x) => x.id === id);

    if (index === -1) {
      throw new Error(`Impossible de trouver un model avec l'ID '${id}'`);
    }

    const model: ContactModel = this.contacts[index];

    return { index: index, model: model };
  }
}

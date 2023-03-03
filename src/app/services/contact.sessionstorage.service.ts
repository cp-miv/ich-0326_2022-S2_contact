import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { ContactEntity } from '../entities/contact.entity';
import { ContactMapper } from '../mappers/contact.mapper';
import { ContactModel } from '../models/contact.model';
import { ContactService } from './contact.service';

@Injectable({
  providedIn: 'root',
})
export class ContactSessionStorageService extends ContactService {
  constructor(private mapper: ContactMapper) {
    super();
  }

  public getAll(): ContactEntity[] {
    const models: ContactModel[] = [];

    for (let key in sessionStorage) {
      if (sessionStorage.hasOwnProperty(key) && key.match(/Contact_\d+/gi)) {
        const modelString: string = sessionStorage.getItem(key)!;
        const model: ContactModel = JSON.parse(modelString);
        models.push(model);
      }
    }

    return models.map(this.mapper.mapFromModel);
  }

  public get(id: number): ContactEntity {
    const modelString: string | null = sessionStorage.getItem(`Contact_${id}`);

    if (modelString === null) {
      throw new Error(`Impossible d'obtenir un contact avec l'ID '${id}'`);
    }

    const model = JSON.parse(modelString);

    return this.mapper.mapFromModel(model);
  }

  public add(entity: ContactEntity): ContactEntity {
    const model = this.mapper.mapFromEntity(entity);
    const id: number = Math.max(0, ...this.getAll().map((x) => x.id)) + 1;

    model.id = id;

    const modelString = JSON.stringify(model);
    sessionStorage.setItem(`Contact_${id}`, modelString);

    return this.mapper.mapFromModel(model);
  }

  public update(entity: ContactEntity): void {
    let modelString: string | null = sessionStorage.getItem(
      `Contact_${entity.id}`
    );

    if (modelString === null) {
      throw new Error(
        `Impossible de trouver un Contact avec l'ID '${entity.id}'`
      );
    }

    const model = JSON.parse(modelString);

    model.firstnameContact = entity.firstname;
    model.lastnameContact = entity.lastname;
    model.ageContact = entity.age;

    modelString = JSON.stringify(model);
    sessionStorage.setItem(`Contact_${model.id}`, modelString);
  }

  public remove(entity: ContactEntity): void {
    sessionStorage.removeItem(`Contact_${entity.id}`);
  }
}

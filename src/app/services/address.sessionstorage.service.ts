import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AddressEntity } from '../entities/address.entity';
import { AddressMapper } from '../mappers/address.mapper';
import { AddressModel } from '../models/address.model';
import { AddressService } from './address.service';

@Injectable({
  providedIn: 'root',
})
export class AddressSessionStorageService extends AddressService {
  constructor(private mapper: AddressMapper) {
    super();
  }

  public getAll(): AddressEntity[] {
    const models: AddressModel[] = [];

    for (let key in sessionStorage) {
      if (sessionStorage.hasOwnProperty(key) && key.match(/Address_\d+/gi)) {
        const modelString: string = sessionStorage.getItem(key)!;
        const model: AddressModel = JSON.parse(modelString);
        models.push(model);
      }
    }

    return models.map(this.mapper.mapFromModel);
  }

  public get(id: number): AddressEntity {
    const modelString: string | null = sessionStorage.getItem(`Address_${id}`);

    if (modelString === null) {
      throw new Error(`Impossible d'obtenir un Address avec l'ID '${id}'`);
    }

    const model = JSON.parse(modelString);

    return this.mapper.mapFromModel(model);
  }

  public add(entity: AddressEntity): AddressEntity {
    const model = this.mapper.mapFromEntity(entity);
    const id: number = Math.max(0, ...this.getAll().map((x) => x.id)) + 1;

    model.id = id;

    const modelString = JSON.stringify(model);
    sessionStorage.setItem(`Address_${id}`, modelString);

    return this.mapper.mapFromModel(model);
  }

  public update(entity: AddressEntity): void {
    let modelString: string | null = sessionStorage.getItem(
      `Address_${entity.id}`
    );

    if (modelString === null) {
      throw new Error(
        `Impossible de trouver un Address avec l'ID '${entity.id}'`
      );
    }

    const model = JSON.parse(modelString);

    model.streetAddress = entity.street;
    model.numberAddress = entity.number;
    model.cityAddress = entity.city;
    model.zipAddress = entity.zip;

    modelString = JSON.stringify(model);
    sessionStorage.setItem(`Address_${model.id}`, modelString);
  }

  public remove(entity: AddressEntity): void {
    sessionStorage.removeItem(`Address_${entity.id}`);
  }
}

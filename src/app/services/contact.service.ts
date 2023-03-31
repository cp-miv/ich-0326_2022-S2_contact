import { Injectable } from '@angular/core';
import { ContactEntity } from '../entities/contact.entity';
import { ContactMapper } from '../mappers/contact.mapper';
import { ContactModel } from '../models/contact.model';
import { RepositoryBase } from '../repositories/repository.base';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(
    private mapper: ContactMapper,
    private repository: RepositoryBase<ContactModel>
  ) {}

  public getAll(): ContactEntity[] {
    return this.repository.getAll().map((x) => this.mapper.mapFromModel(x));
  }

  public get(id: number): ContactEntity {
    const model: ContactModel = this.repository.get(id);

    return this.mapper.mapFromModel(model);
  }

  public add(entity: ContactEntity): ContactEntity {
    let model = this.mapper.mapFromEntity(entity);
    model = this.repository.add(model);

    return this.mapper.mapFromModel(model);
  }

  public update(entity: ContactEntity): void {
    const model = this.mapper.mapFromEntity(entity);
    this.repository.update(model);
  }

  public remove(entity: ContactEntity): void {
    const model = this.mapper.mapFromEntity(entity);
    this.repository.remove(model);
  }
}

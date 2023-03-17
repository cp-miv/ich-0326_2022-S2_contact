import { EntityBase } from '../entities/entity.base';
import { MapperBase } from '../mappers/mapper.base';
import { ModelBase } from '../models/model.base';

export class InMemoryService<
  TEntity extends EntityBase,
  TModel extends ModelBase
> {
  protected models: TModel[];

  constructor(private mapper: MapperBase<TEntity, TModel>) {
    // super();

    this.models = [];
    //   new ContactModel({
    //     id: 1,
    //     firstnameContact: 'Aline',
    //     lastnameContact: 'Dupont',
    //     ageContact: 21,
    //   }),
    //   new ContactModel({
    //     id: 2,
    //     firstnameContact: 'Benjamin',
    //     lastnameContact: 'Lambert',
    //     ageContact: 32,
    //   }),
    //   new ContactModel({
    //     id: 3,
    //     firstnameContact: 'Claudia',
    //     lastnameContact: 'Mercier',
    //     ageContact: 43,
    //   }),
    //   new ContactModel({
    //     id: 4,
    //     firstnameContact: 'Daniel',
    //     lastnameContact: 'Chevalier',
    //     ageContact: 54,
    //   }),
    // ];
  }

  public getAll(): TEntity[] {
    return this.models.map(this.mapper.mapFromModel);
  }

  public get(id: number): TEntity {
    const { model } = this.internalGet(id);

    return this.mapper.mapFromModel(model);
  }

  public add(entity: TEntity): TEntity {
    const id: number = Math.max(0, ...this.models.map((x) => x.id!)) + 1;

    const model: TModel = this.mapper.mapFromEntity(entity);
    model.id = id;
    this.models.push(model);

    return this.mapper.mapFromModel(model);
  }

  public update(entity: TEntity): void {
    const { index, model } = this.internalGet(entity.id);

    this.mapper.assignFromEntity(entity, model);

    this.models[index] = model;
  }

  public remove(entity: TEntity): void {
    let { index } = this.internalGet(entity.id);

    this.models.splice(index, 1);
  }

  protected internalGet(id: number): {
    index: number;
    model: TModel;
  } {
    const index: number = this.models.findIndex((x) => x.id === id);

    if (index === -1) {
      throw new Error(`Impossible de trouver un model avec l'ID '${id}'`);
    }

    const model: TModel = this.models[index];

    return { index: index, model: model };
  }
}

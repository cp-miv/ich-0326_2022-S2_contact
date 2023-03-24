import { EntityBase } from '../entities/entity.base';
import { MapperBase } from '../mappers/mapper.base';
import { ModelBase } from '../models/model.base';

export class LocalStorageService<
  TEntity extends EntityBase,
  TModel extends ModelBase
> {
  protected storage: Storage;

  constructor(private mapper: MapperBase<TEntity, TModel>) {
    this.storage = window.localStorage;
  }

  public getAll(): TEntity[] {
    const models: TModel[] = [];

    for (let key in this.storage) {
      if (this.storage.hasOwnProperty(key) && key.match(/Address_\d+/gi)) {
        const modelString: string = this.storage.getItem(key)!;
        const model: TModel = JSON.parse(modelString);
        models.push(model);
      }
    }

    return models.map(this.mapper.mapFromModel);
  }

  public get(id: number): TEntity {
    const modelString: string | null = this.storage.getItem(`Address_${id}`);

    if (modelString === null) {
      throw new Error(`Impossible d'obtenir un Address avec l'ID '${id}'`);
    }

    const model = JSON.parse(modelString);

    return this.mapper.mapFromModel(model);
  }

  public add(entity: TEntity): TEntity {
    const model = this.mapper.mapFromEntity(entity);
    const id: number = Math.max(0, ...this.getAll().map((x) => x.id)) + 1;

    model.id = id;

    const modelString = JSON.stringify(model);
    this.storage.setItem(`Address_${id}`, modelString);

    return this.mapper.mapFromModel(model);
  }

  public update(entity: TEntity): void {
    let modelString: string | null = this.storage.getItem(
      `Address_${entity.id}`
    );

    if (modelString === null) {
      throw new Error(
        `Impossible de trouver un Address avec l'ID '${entity.id}'`
      );
    }

    const model = JSON.parse(modelString);

    this.mapper.assignFromEntity(entity, model);

    modelString = JSON.stringify(model);
    this.storage.setItem(`Address_${model.id}`, modelString);
  }

  public remove(entity: TEntity): void {
    this.storage.removeItem(`Address_${entity.id}`);
  }
}

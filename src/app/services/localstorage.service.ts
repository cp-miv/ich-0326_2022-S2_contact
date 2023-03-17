import { EntityBase } from '../entities/entity.base';
import { MapperBase } from '../mappers/mapper.base';
import { ModelBase } from '../models/model.base';

export class LocalStorageService<
  TEntity extends EntityBase,
  TModel extends ModelBase
> {
  constructor(private mapper: MapperBase<TEntity, TModel>) {}

  public getAll(): TEntity[] {
    const models: TModel[] = [];

    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key) && key.match(/Address_\d+/gi)) {
        const modelString: string = localStorage.getItem(key)!;
        const model: TModel = JSON.parse(modelString);
        models.push(model);
      }
    }

    return models.map(this.mapper.mapFromModel);
  }

  public get(id: number): TEntity {
    const modelString: string | null = localStorage.getItem(`Address_${id}`);

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
    localStorage.setItem(`Address_${id}`, modelString);

    return this.mapper.mapFromModel(model);
  }

  public update(entity: TEntity): void {
    let modelString: string | null = localStorage.getItem(
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
    localStorage.setItem(`Address_${model.id}`, modelString);
  }

  public remove(entity: TEntity): void {
    localStorage.removeItem(`Address_${entity.id}`);
  }
}

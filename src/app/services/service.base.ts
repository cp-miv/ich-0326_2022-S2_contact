import { EntityBase } from '../entities/entity.base';
import { IMapper } from '../mappers/imapper';
import { ModelBase } from '../models/model.base';
import { IRepository } from '../repositories/irepository';
import { IService } from './iservice';

export abstract class ServiceBase<
  TEntity extends EntityBase,
  TModel extends ModelBase
> extends IService<TEntity> {
  constructor(
    protected mapper: IMapper<TEntity, TModel>,
    protected repository: IRepository<TModel>
  ) {
    super();
  }

  public getAll(): TEntity[] {
    return this.repository.getAll().map((x) => this.mapper.mapFromModel(x));
  }

  public get(id: number): TEntity {
    const model: TModel = this.repository.get(id);

    return this.mapper.mapFromModel(model);
  }

  public add(entity: TEntity): TEntity {
    let model: TModel = this.mapper.mapFromEntity(entity);
    model = this.repository.add(model);

    return this.mapper.mapFromModel(model);
  }

  public update(entity: TEntity): void {
    const model: TModel = this.mapper.mapFromEntity(entity);
    this.repository.update(model);
  }

  public remove(entity: TEntity): void {
    const model: TModel = this.mapper.mapFromEntity(entity);
    this.repository.remove(model);
  }
}

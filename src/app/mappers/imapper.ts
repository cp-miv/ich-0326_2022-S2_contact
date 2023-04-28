import { EntityBase } from '../entities/entity.base';
import { ModelBase } from '../models/model.base';

export abstract class IMapper<
  TEntity extends EntityBase,
  TModel extends ModelBase
> {
  public abstract assignFromEntity(entity: TEntity, model: TModel): void;
  public abstract assignFromModel(model: TModel, entity: TEntity): void;
  public abstract mapFromEntity(entity: TEntity): TModel;
  public abstract mapFromModel(model: TModel): TEntity;
}

import { EntityBase } from '../entities/entity.base';

export abstract class IService<TEntity extends EntityBase> {
  public abstract getAll(): TEntity[];
  public abstract get(id: number): TEntity;
  public abstract add(entity: TEntity): TEntity;
  public abstract update(entity: TEntity): void;
  public abstract remove(entity: TEntity): void;
}

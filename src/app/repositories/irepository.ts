import { ModelBase } from '../models/model.base';

export abstract class IRepository<TModel extends ModelBase> {
  public abstract getAll(): TModel[];
  public abstract get(id: number): TModel;
  public abstract add(model: TModel): TModel;
  public abstract update(model: TModel): void;
  public abstract remove(model: TModel): void;
}

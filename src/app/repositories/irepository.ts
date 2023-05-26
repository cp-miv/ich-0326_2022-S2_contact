import { Observable } from 'rxjs';
import { ModelBase } from '../models/model.base';

export abstract class IRepository<TModel extends ModelBase> {
  public abstract getAll(): Observable<TModel[]>;
  public abstract get(id: number): Observable<TModel>;
  public abstract add(model: TModel): Observable<TModel>;
  public abstract update(model: TModel): Observable<void>;
  public abstract remove(model: TModel): Observable<void>;
}

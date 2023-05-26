import { Observable } from 'rxjs';
import { EntityBase } from '../entities/entity.base';

export abstract class IService<TEntity extends EntityBase> {
  public abstract getAll(): Observable<TEntity[]>;
  public abstract get(id: number): Observable<TEntity>;
  public abstract add(entity: TEntity): Observable<TEntity>;
  public abstract update(entity: TEntity): Observable<void>;
  public abstract remove(entity: TEntity): Observable<void>;
}

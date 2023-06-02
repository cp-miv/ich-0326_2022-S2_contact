import { mergeMap, Observable, of } from 'rxjs';
import { ObservableHelper } from '../helpers/observable.helper';
import { ModelBase } from '../models/model.base';
import { IRepository } from './irepository';

export abstract class ProxyRepository<
  TModel extends ModelBase
> extends IRepository<TModel> {
  constructor(protected backend: IRepository<TModel>) {
    super();
  }

  public override getAll(): Observable<TModel[]> {
    return this.beforeGetAll().pipe(
      mergeMap(() => this.backend.getAll()),
      mergeMap((models: TModel[]) => this.afterGetAll(models))
    );
  }

  public override get(id: number): Observable<TModel> {
    return this.beforeGet(id).pipe(
      mergeMap((id) => this.backend.get(id)),
      mergeMap((model: TModel) => this.afterGet(id, model))
    );
  }

  public override add(model: TModel): Observable<TModel> {
    return this.beforeAdd(model).pipe(
      mergeMap((model) => this.backend.add(model)),
      mergeMap((model: TModel) => this.afterAdd(model))
    );
  }

  public override update(model: TModel): Observable<TModel> {
    return this.beforeUpdate(model).pipe(
      mergeMap((model) => this.backend.update(model)),
      mergeMap((model: TModel) => this.afterUpdate(model))
    );
  }

  public override remove(model: TModel): Observable<TModel> {
    return this.beforeRemove(model).pipe(
      mergeMap((model) => this.backend.remove(model)),
      mergeMap((model: TModel) => this.afterRemove(model))
    );
  }

  protected beforeGetAll(): Observable<void> {
    return ObservableHelper.void();
  }
  protected afterGetAll(models: TModel[]): Observable<TModel[]> {
    return of(models);
  }

  protected beforeGet(id: number): Observable<number> {
    return of(id);
  }
  protected afterGet(id: number, model: TModel): Observable<TModel> {
    return of(model);
  }

  protected beforeAdd(model: TModel): Observable<TModel> {
    return of(model);
  }
  protected afterAdd(model: TModel): Observable<TModel> {
    return of(model);
  }

  protected beforeUpdate(model: TModel): Observable<TModel> {
    return of(model);
  }
  protected afterUpdate(model: TModel): Observable<TModel> {
    return of(model);
  }

  protected beforeRemove(model: TModel): Observable<TModel> {
    return of(model);
  }
  protected afterRemove(model: TModel): Observable<TModel> {
    return of(model);
  }
}

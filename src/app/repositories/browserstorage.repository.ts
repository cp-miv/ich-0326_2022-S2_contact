import { ObservableHelper } from '../helpers/observable.helper';
import { StorageHelper } from '../helpers/storage.helper';
import { ModelBase } from '../models/model.base';
import { IRepository } from './irepository';
import { Observable, from, map, of } from 'rxjs';

export class BrowserStorageRepository<
  TModel extends ModelBase
> extends IRepository<TModel> {
  protected storage: StorageHelper<TModel>;

  constructor(storage: Storage, className: string) {
    super();

    this.storage = new StorageHelper<TModel>(
      storage,
      `${className}_`,
      (x) => x.id!
    );
  }

  public override getAll(): Observable<TModel[]> {
    return of(this.storage.getItems());
  }

  public override get(id: number): Observable<TModel> {
    return of(this.storage.getItem(id.toString()));
  }

  public override add(model: TModel): Observable<TModel> {
    const items: TModel[] = this.storage.getItems();
    const id: number = Math.max(0, ...items.map((x) => x.id!)) + 1;

    model.id = id;

    this.storage.setItem(model);

    return of(model);
  }

  public override update(model: TModel): Observable<void> {
    this.storage.setItem(model);

    return ObservableHelper.void();
  }

  public override remove(model: TModel): Observable<void> {
    this.storage.removeItem(model);

    return ObservableHelper.void();
  }
}

import { StorageHelper } from '../helpers/storage.helper';
import { ModelBase } from '../models/model.base';
import { IRepository } from './irepository';

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

  public getAll(): TModel[] {
    return this.storage.getItems();
  }

  public get(id: number): TModel {
    return this.storage.getItem(id.toString());
  }

  public add(model: TModel): TModel {
    const id: number = Math.max(0, ...this.getAll().map((x) => x.id!)) + 1;

    model.id = id;

    this.storage.setItem(model);

    return model;
  }

  public update(model: TModel): void {
    this.storage.setItem(model);
  }

  public remove(model: TModel): void {
    this.storage.removeItem(model);
  }
}

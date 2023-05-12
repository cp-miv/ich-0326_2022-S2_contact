import { JSHelper } from '../helpers/js.helper';
import { StorageHelper } from '../helpers/storage.helper';
import { ModelBase } from '../models/model.base';
import { IRepository } from './irepository';

export class DelayedBrowserStorageRepository<
  TModel extends ModelBase
> extends IRepository<TModel> {
  protected storage: StorageHelper<TModel>;
  protected delayMs: number;

  constructor(storage: Storage, className: string, delayMs: number = 1000) {
    super();

    this.storage = new StorageHelper<TModel>(
      storage,
      `${className}_`,
      (x) => x.id!
    );

    this.delayMs = delayMs;
  }

  public getAll(): TModel[] {
    JSHelper.sleep(this.delayMs);

    return this.storage.getItems();
  }

  public get(id: number): TModel {
    JSHelper.sleep(this.delayMs);

    return this.storage.getItem(id.toString());
  }

  public add(model: TModel): TModel {
    JSHelper.sleep(this.delayMs);

    const id: number = Math.max(0, ...this.getAll().map((x) => x.id!)) + 1;

    model.id = id;

    this.storage.setItem(model);

    return model;
  }

  public update(model: TModel): void {
    JSHelper.sleep(this.delayMs);

    this.storage.setItem(model);
  }

  public remove(model: TModel): void {
    JSHelper.sleep(this.delayMs);

    this.storage.removeItem(model);
  }
}

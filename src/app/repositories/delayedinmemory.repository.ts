import { JSHelper } from '../helpers/js.helper';
import { ModelBase } from '../models/model.base';
import { IRepository } from './irepository';

class DelayedInMemoryRepository<
  TModel extends ModelBase
> extends IRepository<TModel> {
  protected models: TModel[];
  protected delayMs: number;

  constructor(delayMs: number = 1000) {
    super();
    this.models = [];

    this.delayMs = delayMs;
  }

  public override getAll(): TModel[] {
    JSHelper.sleep(this.delayMs);
    return this.models;
  }

  public override get(id: number): TModel {
    JSHelper.sleep(this.delayMs);

    const { model } = this.internalGet(id);

    return model;
  }

  public override add(model: TModel): TModel {
    JSHelper.sleep(this.delayMs);

    const id: number = Math.max(0, ...this.models.map((x) => x.id!)) + 1;
    model.id = id;

    this.models.push(model);

    return model;
  }

  public override update(model: TModel): void {
    JSHelper.sleep(this.delayMs);

    const { index } = this.internalGet(model.id);

    this.models[index] = model;
  }

  public override remove(model: TModel): void {
    JSHelper.sleep(this.delayMs);

    const { index } = this.internalGet(model.id);

    this.models.splice(index, 1);
  }

  protected internalGet(id: number | undefined): {
    index: number;
    model: TModel;
  } {
    if (id === undefined) {
      throw new Error(`Impossible de trouver un model sans ID`);
    }

    const index: number = this.models.findIndex((x) => x.id === id);

    if (index === -1) {
      throw new Error(`Impossible de trouver un model avec l'ID '${id}'`);
    }

    const model: TModel = this.models[index];

    return { index: index, model: model };
  }
}

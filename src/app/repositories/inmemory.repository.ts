import { Observable, of } from 'rxjs';
import { ModelBase } from '../models/model.base';
import { IRepository } from './irepository';
import { ObservableHelper } from '../helpers/observable.helper';

export class InMemoryRepository<
  TModel extends ModelBase
> extends IRepository<TModel> {
  protected models: TModel[];

  constructor() {
    super();
    this.models = [];
  }

  public override getAll(): Observable<TModel[]> {
    return of(this.models);
  }

  public override get(id: number): Observable<TModel> {
    const { model } = this.internalGet(id);

    return of(model);
  }

  public override add(model: TModel): Observable<TModel> {
    const id: number = Math.max(0, ...this.models.map((x) => x.id!)) + 1;
    model.id = id;

    this.models.push(model);

    return of(model);
  }

  public override update(model: TModel): Observable<TModel> {
    const { index } = this.internalGet(model.id);

    this.models[index] = model;

    return of(model);
  }

  public override remove(model: TModel): Observable<TModel> {
    const { index } = this.internalGet(model.id);

    this.models.splice(index, 1);

    return of(model);
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

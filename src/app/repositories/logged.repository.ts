import { Observable } from 'rxjs';
import { ModelBase } from '../models/model.base';
import { IRepository } from './irepository';

export class LoggedRepository<
  TModel extends ModelBase
> extends IRepository<TModel> {
  protected backend: IRepository<TModel>;

  constructor(backend: IRepository<TModel>) {
    super();
    this.backend = backend;
  }

  public override getAll(): Observable<TModel[]> {
    this.log('getAll');

    return this.backend.getAll();
  }

  public override get(id: number): Observable<TModel> {
    this.log('get');

    return this.backend.get(id);
  }

  public override add(model: TModel): Observable<TModel> {
    this.log('add');

    return this.backend.add(model);
  }

  public override update(model: TModel): Observable<void> {
    this.log('update');

    return this.backend.update(model);
  }

  public override remove(model: TModel): Observable<void> {
    this.log('remove');

    return this.backend.remove(model);
  }

  protected log(methodName: string): void {
    console.log(`The method '${methodName}' has been called`);
  }
}

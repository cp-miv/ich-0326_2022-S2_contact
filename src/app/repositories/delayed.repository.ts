import { Observable, delay, of } from 'rxjs';
import { ModelBase } from '../models/model.base';
import { IRepository } from './irepository';
import { ProxyRepository } from './proxy.repository';

export class DelayedRepository<
  TModel extends ModelBase
> extends ProxyRepository<TModel> {
  constructor(backend: IRepository<TModel>, private delayMs: number = 1000) {
    super(backend);
  }

  protected override afterGetAll(models: TModel[]): Observable<TModel[]> {
    return of(models).pipe(delay(this.delayMs));
  }
}

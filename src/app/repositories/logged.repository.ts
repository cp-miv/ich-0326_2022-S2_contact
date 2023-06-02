import { Observable } from 'rxjs';
import { ModelBase } from '../models/model.base';
import { IRepository } from './irepository';
import { ProxyRepository } from './proxy.repository';

export class LoggedRepository<
  TModel extends ModelBase
> extends ProxyRepository<TModel> {
  constructor(backend: IRepository<TModel>) {
    super(backend);
  }

  public override beforeGet(id: number): Observable<number> {
    this.log('before get');

    return super.beforeGet(id);
  }

  protected log(methodName: string): void {
    console.log(`The method '${methodName}' has been called`);
  }
}

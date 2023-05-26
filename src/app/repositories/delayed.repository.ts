import { Observable, delay } from 'rxjs';
import { ModelBase } from '../models/model.base';
import { IRepository } from './irepository';

export class DelayedRepository<
  TModel extends ModelBase
> extends IRepository<TModel> {
  constructor(
    private backend: IRepository<TModel>,
    private delayMs: number = 1000
  ) {
    super();
  }

  public override getAll(): Observable<TModel[]> {
    return this.backend.getAll().pipe(delay(this.delayMs));
  }

  public override get(id: number): Observable<TModel> {
    return this.backend.get(id).pipe(delay(this.delayMs));
  }

  public override add(model: TModel): Observable<TModel> {
    return this.backend.add(model).pipe(delay(this.delayMs));
  }

  public override update(model: TModel): Observable<void> {
    return this.backend.update(model).pipe(delay(this.delayMs));
  }

  public override remove(model: TModel): Observable<void> {
    return this.backend.remove(model).pipe(delay(this.delayMs));
  }
}

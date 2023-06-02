import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ModelBase } from '../models/model.base';
import { IRepository } from './irepository';

export class HttpRepository<
  TModel extends ModelBase
> extends IRepository<TModel> {
  constructor(protected http: HttpClient, protected endpoint: string) {
    super();
  }

  public override getAll(): Observable<TModel[]> {
    return this.http.get<TModel[]>(`${this.endpoint}`);
  }

  public override get(id: number): Observable<TModel> {
    return this.http.get<TModel>(`${this.endpoint}/${id}`);
  }

  public override add(model: TModel): Observable<TModel> {
    return this.http.post<TModel>(`${this.endpoint}`, model);
  }

  public override update(model: TModel): Observable<TModel> {
    return this.http.put<TModel>(`${this.endpoint}/${model.id}`, model);
  }

  public override remove(model: TModel): Observable<TModel> {
    return this.http.delete<TModel>(`${this.endpoint}/${model.id}`);
  }
}

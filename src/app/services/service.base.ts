import { Observable, from, map, of, switchMap } from 'rxjs';
import { EntityBase } from '../entities/entity.base';
import { IMapper } from '../mappers/imapper';
import { ModelBase } from '../models/model.base';
import { IRepository } from '../repositories/irepository';
import { IService } from './iservice';

export abstract class ServiceBase<
  TEntity extends EntityBase,
  TModel extends ModelBase
> extends IService<TEntity> {
  constructor(
    protected mapper: IMapper<TEntity, TModel>,
    protected repository: IRepository<TModel>
  ) {
    super();
  }

  public getAll(): Observable<TEntity[]> {
    const models$: Observable<TModel[]> = this.repository.getAll();

    return models$.pipe(
      map((models: TModel[]) => {
        return models.map((model: TModel) => this.mapper.mapFromModel(model));
      })
    );
  }

  public get(id: number): Observable<TEntity> {
    const model$: Observable<TModel> = this.repository.get(id);

    return model$.pipe(map((x) => this.mapper.mapFromModel(x)));
  }

  public add(entity: TEntity): Observable<TEntity> {
    const model: TModel = this.mapper.mapFromEntity(entity);
    const model$: Observable<TModel> = this.repository.add(model);

    return model$.pipe(map((x) => this.mapper.mapFromModel(x)));
  }

  public update(entity: TEntity): Observable<void> {
    const model: TModel = this.mapper.mapFromEntity(entity);
    return this.repository.update(model);
  }

  public remove(entity: TEntity): Observable<void> {
    const model: TModel = this.mapper.mapFromEntity(entity);
    return this.repository.remove(model);
  }
}

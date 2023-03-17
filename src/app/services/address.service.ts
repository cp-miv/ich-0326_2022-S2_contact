import { Injectable } from '@angular/core';
import { AddressEntity } from '../entities/address.entity';

@Injectable({
  providedIn: 'root',
})
export abstract class AddressService {
  public abstract getAll(): AddressEntity[];
  public abstract get(id: number): AddressEntity;
  public abstract add(entity: AddressEntity): AddressEntity;
  public abstract update(entity: AddressEntity): void;
  public abstract remove(entity: AddressEntity): void;
}

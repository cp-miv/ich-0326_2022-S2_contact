import { Injectable } from '@angular/core';
import { ContactEntity } from '../entities/contact.entity';

@Injectable({
  providedIn: 'root',
})
export abstract class ContactService {
  public abstract getAll(): ContactEntity[];
  public abstract get(id: number): ContactEntity;
  public abstract add(entity: ContactEntity): ContactEntity;
  public abstract update(entity: ContactEntity): void;
  public abstract remove(entity: ContactEntity): void;
}

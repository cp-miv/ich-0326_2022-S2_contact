import { ContactModel } from '../models/contact.model';

export class StorageHelper<T> {
  constructor(
    private backend: Storage,
    private keyPrefix: string,
    private idProvider: (x: T) => number
  ) {}

  /*
   * Return a list of all items manager by this helper.
   */
  public getItems(): T[] {
    const items: T[] = [];

    for (let key in this.backend) {
      if (this.backend.hasOwnProperty(key) && key.match(/Address_\d+/gi)) {
        const itemString: string = this.backend.getItem(key)!;
        const item: T = JSON.parse(itemString);
        items.push(item);
      }
    }

    return items;
  }

  public getItem(id: number): T | undefined {
    return this.getItems().find((x) => this.idProvider(x) === id);
  }

  public setItem(item: T): void {
    const id: number = this.idProvider(item);
    const key: string = `${this.keyPrefix}${id}`;
    const value: string = JSON.stringify(item);

    this.backend.setItem(key, value);
  }

  public removeItem(item: { id?: number }): void {
    if (item.id === undefined) {
      throw new Error('Unable to call removeItem with undefined id');
    }
  }

  public removeAll(): void {
    throw new Error('Not implemented');
  }
}

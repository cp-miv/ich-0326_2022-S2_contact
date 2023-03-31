export class StorageHelper<T> {
  constructor(
    private backend: Storage,
    private keyPrefix: string,
    private idProvider: (x: T) => number
  ) {}

  public getItems(id: string = '\\d+'): T[] {
    const pattern = this.computeKey(id);
    const regex = new RegExp(pattern, 'gi');
    const models: T[] = [];

    for (let key in this.backend) {
      if (this.backend.hasOwnProperty(key) && key.match(regex)) {
        const item: string = this.backend.getItem(key)!;
        const model: T = this.deserialize(item);
        models.push(model);
      }
    }

    models.sort((a, b) => this.idProvider(a) - this.idProvider(b));

    return models;
  }

  public getItem(id: string): T {
    const models: T[] = this.getItems(id);

    if (models.length === 0) {
      throw new Error(`Impossible de trouver un model avec l'ID '${id}'`);
    }

    return models[0];
  }

  public setItem(model: T): void {
    const id: number = this.idProvider(model);
    const key: string = this.computeKey(id.toString());
    const value: string = this.serialize(model);
    this.backend.setItem(key, value);
  }

  public removeItem(model: T): void {
    const id: number = this.idProvider(model);
    const key = this.computeKey(id.toString());
    this.backend.removeItem(key);
  }

  public clear(): void {
    const models: T[] = this.getItems();
    models.forEach(this.removeItem);
  }

  protected computeKey(id: string): string {
    return `${this.keyPrefix}${id}`;
  }

  protected serialize(model: T): string {
    return JSON.stringify(model);
  }

  protected deserialize(value: string): T {
    return JSON.parse(value);
  }
}

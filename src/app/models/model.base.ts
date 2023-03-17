export abstract class ModelBase {
  public id?: number;

  constructor(params: { id?: number }) {
    this.id = params?.id;
  }
}

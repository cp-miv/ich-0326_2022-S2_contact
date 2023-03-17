export abstract class EntityBase {
  protected _id!: number;

  constructor(params?: { id?: number }) {
    this.id = params?.id ?? EntityBase.DefaultID;
  }

  /**
   * Getters / Setters
   */

  public get id(): number {
    return this._id;
  }

  public set id(value: number) {
    if (this._id !== undefined && this._id !== EntityBase.DefaultID) return;

    this._id = value;
  }

  /**
   * Const / Static fields
   */

  static readonly DefaultID: number = 0;
}

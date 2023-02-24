export class ContactEntity {
  protected _id!: number;
  protected _firstname!: string;
  protected _lastname!: string;
  protected _age!: number;

  constructor(params?: {
    id?: number;
    firstname: string;
    lastname: string;
    age: number;
  }) {
    this.id = params?.id ?? ContactEntity.DefaultID;
    this.firstname = params?.firstname ?? ContactEntity.DefaultFirstname;
    this.lastname = params?.lastname ?? ContactEntity.DefaultLastname;
    this.age = params?.age ?? ContactEntity.DefaultAge;
  }

  /**
   * Public methods
   */

  public clone(): ContactEntity {
    return new ContactEntity(this);
  }

  /**
   * Getters / Setters
   */

  public get id(): number {
    return this._id;
  }

  public set id(value: number) {
    if (this._id !== undefined && this._id !== ContactEntity.DefaultID) return;

    this._id = value;
  }

  public get firstname(): string {
    return this._firstname;
  }

  public set firstname(value: string) {
    this._firstname = value;
  }

  public get lastname(): string {
    return this._lastname;
  }

  public set lastname(value: string) {
    this._lastname = value;
  }

  public get age(): number {
    return this._age;
  }

  public set age(value: number) {
    if (value < 0) return;

    this._age = value;
  }

  /**
   * Const / Static fields
   */

  static readonly DefaultID: number = 0;
  static readonly DefaultFirstname: string = 'Prenom inconnu';
  static readonly DefaultLastname: string = 'Nom inconnu';
  static readonly DefaultAge: number = 0;
}

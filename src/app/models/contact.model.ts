import { ModelBase } from './model.base';

export class ContactModel extends ModelBase {
  public firstnameContact: string;
  public lastnameContact: string;
  public ageContact: number;

  constructor(params: {
    id?: number;
    firstnameContact: string;
    lastnameContact: string;
    ageContact: number;
  }) {
    super({ id: params?.id });

    this.firstnameContact = params.firstnameContact;
    this.lastnameContact = params.lastnameContact;
    this.ageContact = params.ageContact;
  }
}

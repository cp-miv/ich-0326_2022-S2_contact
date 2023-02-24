export class ContactModel {
  public id?: number;
  public firstnameContact: string;
  public lastnameContact: string;
  public ageContact: number;

  constructor(params: {
    id?: number;
    firstnameContact: string;
    lastnameContact: string;
    ageContact: number;
  }) {
    this.id = params?.id;
    this.firstnameContact = params.firstnameContact;
    this.lastnameContact = params.lastnameContact;
    this.ageContact = params.ageContact;
  }
}

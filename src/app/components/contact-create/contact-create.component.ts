import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IService } from 'src/app/services/iservice';
import { ContactEntity } from 'src/app/entities/contact.entity';

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.scss'],
})
export class ContactCreateComponent {
  constructor(
    private contactService: IService<ContactEntity>,
    private router: Router
  ) {}

  public onSubmitForm(contactForm: NgForm): void {
    let newContact: ContactEntity = new ContactEntity(contactForm.value);

    newContact = this.contactService.add(newContact);

    this.router.navigateByUrl('/contact');
  }
}

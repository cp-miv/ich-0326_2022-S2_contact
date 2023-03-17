import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactEntity } from 'src/app/entities/contact.entity';
import { ContactInMemoryService } from 'src/app/services/contact.inmemory.service';
import { ContactLocalStorageService } from 'src/app/services/contact.localstorage.service';
import { ContactService } from 'src/app/services/contact.service';
import { ContactSessionStorageService } from 'src/app/services/contact.sessionstorage.service';

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.scss'],
})
export class ContactCreateComponent {
  constructor(private contactService: ContactService, private router: Router) {}

  public onSubmitForm(contactForm: NgForm): void {
    let newContact: ContactEntity = new ContactEntity(contactForm.value);

    newContact = this.contactService.add(newContact);

    this.router.navigateByUrl('/contact');
  }
}

import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { ContactEntity } from 'src/app/entities/contact.entity';
import { IService } from 'src/app/services/iservice';

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
    const newContact: ContactEntity = new ContactEntity(contactForm.value);

    this.contactService
      .add(newContact)
      .pipe(tap(() => this.router.navigateByUrl('/contact')))
      .subscribe();
  }
}

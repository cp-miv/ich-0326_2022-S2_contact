import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactEntity } from 'src/app/entities/contact.entity';
import { ContactInMemoryService } from 'src/app/services/contact.inmemory.service';
import { ContactLocalStorageService } from 'src/app/services/contact.localstorage.service';
import { ContactService } from 'src/app/services/contact.service';
import { ContactSessionStorageService } from 'src/app/services/contact.sessionstorage.service';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss'],
})
export class ContactEditComponent implements OnInit {
  protected contact!: ContactEntity;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    const id: number = +this.route.snapshot.params['id'];
    this.contact = this.contactService.get(id);
  }

  public onSubmitForm(): void {
    this.contactService.update(this.contact);

    this.router.navigateByUrl('/contact');
  }
}

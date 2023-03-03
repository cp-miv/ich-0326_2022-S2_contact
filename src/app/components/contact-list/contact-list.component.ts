import { Component, OnInit } from '@angular/core';
import { ContactInMemoryService } from 'src/app/services/contact.inmemory.service';
import { ContactLocalStorageService } from 'src/app/services/contact.localstorage.service';
import { ContactService } from 'src/app/services/contact.service';
import { ContactSessionStorageService } from 'src/app/services/contact.sessionstorage.service';
import { ContactEntity } from '../../entities/contact.entity';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  protected contacts!: ContactEntity[];

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contacts = this.contactService.getAll();
  }
}

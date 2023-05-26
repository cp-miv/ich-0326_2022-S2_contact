import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactEntity } from 'src/app/entities/contact.entity';

@Component({
  selector: 'app-contact-list-item',
  templateUrl: './contact-list-item.component.html',
  styleUrls: ['./contact-list-item.component.scss'],
})
export class ContactListItemComponent {
  @Input() public contact!: ContactEntity;
}

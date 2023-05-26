import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IService } from 'src/app/services/iservice';
import { ContactEntity } from '../../entities/contact.entity';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  protected contacts$!: Observable<ContactEntity[]>;

  constructor(private contactService: IService<ContactEntity>) {}

  ngOnInit(): void {
    this.contacts$ = this.contactService.getAll();
  }
}

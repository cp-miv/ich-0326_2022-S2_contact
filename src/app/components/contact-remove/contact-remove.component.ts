import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactEntity } from 'src/app/entities/contact.entity';
import { ContactInMemoryService } from 'src/app/services/contact.inmemory.service';

@Component({
  selector: 'app-contact-remove',
  templateUrl: './contact-remove.component.html',
  styleUrls: ['./contact-remove.component.scss'],
})
export class ContactRemoveComponent implements OnInit {
  protected contact!: ContactEntity;

  constructor(
    private contactService: ContactInMemoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    const id: number = +this.route.snapshot.params['id'];
    this.contact = this.contactService.get(id);
  }

  public onSubmitForm(): void {
    this.contactService.remove(this.contact);

    this.router.navigateByUrl('/contacts');
  }
}

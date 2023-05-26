import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ContactEntity } from 'src/app/entities/contact.entity';
import { IService } from 'src/app/services/iservice';

@Component({
  selector: 'app-contact-remove',
  templateUrl: './contact-remove.component.html',
  styleUrls: ['./contact-remove.component.scss'],
})
export class ContactRemoveComponent implements OnInit {
  protected contact$!: Observable<ContactEntity>;
  private contact!: ContactEntity;

  constructor(
    private contactService: IService<ContactEntity>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    const id: number = +this.route.snapshot.params['id'];
    this.contact$ = this.contactService
      .get(id)
      .pipe(tap((contact) => (this.contact = contact)));
  }

  public onSubmitForm(): void {
    this.contactService
      .remove(this.contact)
      .pipe(tap(() => this.router.navigateByUrl('/contact')))
      .subscribe();
  }
}

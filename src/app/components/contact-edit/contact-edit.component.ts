import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { IService } from 'src/app/services/iservice';
import { ContactEntity } from 'src/app/entities/contact.entity';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss'],
})
export class ContactEditComponent implements OnInit {
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
      .pipe(tap((x) => (this.contact = x)));
  }

  public onSubmitForm(): void {
    this.contactService
      .update(this.contact)
      .pipe(tap(() => this.router.navigateByUrl('/contact')))
      .subscribe();
  }
}

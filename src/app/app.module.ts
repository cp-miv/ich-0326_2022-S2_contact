import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactListItemComponent } from './components/contact-list-item/contact-list-item.component';
import { ContactCreateComponent } from './components/contact-create/contact-create.component';
import { FormsModule } from '@angular/forms';
import { ContactEditComponent } from './components/contact-edit/contact-edit.component';
import { ContactRemoveComponent } from './components/contact-remove/contact-remove.component';
import { ContactService } from './services/contact.service';
import { ContactEntity } from './entities/contact.entity';
import { ContactModel } from './models/contact.model';
import { AddressModel } from './models/address.model';
import { IService } from './services/iservice';
import { AddressEntity } from './entities/address.entity';
import { AddressService } from './services/address.service';
import { IMapper } from './mappers/imapper';
import { AddressMapper } from './mappers/address.mapper';
import { ContactMapper } from './mappers/contact.mapper';
import { IRepository } from './repositories/irepository';
import { BrowserStorageRepository } from './repositories/browserstorage.repository';

const browserStorageType: Storage = window.sessionStorage;

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    ContactListItemComponent,
    ContactCreateComponent,
    ContactEditComponent,
    ContactRemoveComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [
    { provide: IService<AddressEntity>, useClass: AddressService },
    { provide: IService<ContactEntity>, useClass: ContactService },

    { provide: IMapper<AddressEntity, AddressModel>, useClass: AddressMapper },
    { provide: IMapper<ContactEntity, ContactModel>, useClass: ContactMapper },

    {
      provide: IRepository<AddressModel>,
      useFactory: () => {
        return new BrowserStorageRepository<AddressModel>(
          browserStorageType,
          'address'
        );
      },
    },
    {
      provide: IRepository<ContactModel>,
      useFactory: () => {
        return new BrowserStorageRepository<ContactModel>(
          browserStorageType,
          'contact'
        );
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {}
}

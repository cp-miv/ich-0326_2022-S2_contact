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
import { ContactEntity } from './entities/contact.entity';
import { ContactModel } from './models/contact.model';
import { AddressModel } from './models/address.model';
import { IMapper } from './mappers/imapper';
import { AddressMapper } from './mappers/address.mapper';
import { ContactMapper } from './mappers/contact.mapper';
import { IRepository } from './repositories/irepository';
import { BrowserStorageRepository } from './repositories/browserstorage.repository';
import { AddressEntity } from './entities/address.entity';
import { DelayedRepository } from './repositories/delayed.repository';
import { IService } from './services/iservice';
import { ContactService } from './services/contact.service';
import { LoaderComponent } from './components/loader/loader.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpRepository } from './repositories/http.repository';
import { LoggedRepository } from './repositories/logged.repository';

const storage: Storage = window.localStorage;

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    ContactListItemComponent,
    ContactCreateComponent,
    ContactEditComponent,
    ContactRemoveComponent,
    LoaderComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [
    {
      provide: IService<AddressEntity>,
      useClass: ContactService,
    },
    {
      provide: IService<ContactEntity>,
      useClass: ContactService,
    },
    {
      provide: IMapper<AddressEntity, AddressModel>,
      useClass: AddressMapper,
    },
    {
      provide: IMapper<ContactEntity, ContactModel>,
      useClass: ContactMapper,
    },
    {
      provide: IRepository<AddressModel>,
      useFactory: () =>
        new BrowserStorageRepository<AddressModel>(storage, 'address'),
    },
    {
      provide: IRepository<ContactModel>,
      useFactory: (http: HttpClient) => {
        let repository: IRepository<ContactModel> | null = null;

        repository = new HttpRepository(http, 'http://localhost:3000/contacts');
        repository = new DelayedRepository(repository, 2000);
        repository = new LoggedRepository(repository);

        return repository!;
      },

      deps: [HttpClient],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {}
}

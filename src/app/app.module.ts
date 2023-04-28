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
import { ContactLocalStorageService } from './services/contact.localstorage.service';
import { ContactService } from './services/contact.service';
import { StorageHelper } from './helpers/storage.helper';
import { ContactEntity } from './entities/contact.entity';
import { ContactModel } from './models/contact.model';
import { AddressModel } from './models/address.model';

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
    { provide: ContactService, useClass: ContactLocalStorageService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    // let storageHelper = new StorageHelper<ContactEntity>(
    //   window.sessionStorage,
    //   'Contact_',
    //   (x) => x.id
    // );
    // let myContact: ContactEntity = storageHelper.getItem(34)!;
    // myContact.age = 18;
    // storageHelper.setItem(myContact);\401\en\Course_backup
    // let contacts: ContactEntity[] = storageHelper.getItems();
    // storageHelper.removeAll();
  }
}

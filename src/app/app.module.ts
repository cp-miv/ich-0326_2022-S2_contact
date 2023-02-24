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
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

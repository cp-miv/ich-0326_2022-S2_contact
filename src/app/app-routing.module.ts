import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactCreateComponent } from './components/contact-create/contact-create.component';
import { ContactEditComponent } from './components/contact-edit/contact-edit.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactRemoveComponent } from './components/contact-remove/contact-remove.component';

const routes: Routes = [
  { path: 'contacts/remove/:id', component: ContactRemoveComponent },
  { path: 'contacts/edit/:id', component: ContactEditComponent },
  { path: 'contacts/create', component: ContactCreateComponent },
  { path: 'contacts', component: ContactListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

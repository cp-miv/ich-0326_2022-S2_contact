import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactCreateComponent } from './components/contact-create/contact-create.component';
import { ContactEditComponent } from './components/contact-edit/contact-edit.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactRemoveComponent } from './components/contact-remove/contact-remove.component';

const routes: Routes = [
  { path: 'contact/remove/:id', component: ContactRemoveComponent },
  { path: 'contact/edit/:id', component: ContactEditComponent },
  { path: 'contact/create', component: ContactCreateComponent },
  { path: 'contact', component: ContactListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

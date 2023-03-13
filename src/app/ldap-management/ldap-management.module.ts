import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LdapManagementRoutingModule} from './ldap-management-routing.module';
import {AppMaterialModule} from "../app-material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LdapListComponent} from "./ldap-list/ldap-list.component";
import {LdapAddComponent} from "./ldap-add/ldap-add.component";
import {LdapEditComponent} from "./ldap-edit/ldap-edit.component";
import {AlertComponent} from "../alert/alert.component";
import {BrowserModule} from "@angular/platform-browser";
import { HttpClientModule } from '@angular/common/http';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatInputModule} from "@angular/material/input";
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryUsersService } from '../in-memory-users.service';


@NgModule({
  declarations: [
    LdapListComponent,
    LdapAddComponent,
    LdapEditComponent,
    AlertComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    LdapManagementRoutingModule,
    HttpClientModule,
    MatSlideToggleModule,
    MatInputModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryUsersService, {dataEncapsulation: false}
    )
  ]
})
export class LdapManagementModule {
}

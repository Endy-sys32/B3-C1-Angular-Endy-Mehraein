import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppMaterialModule} from "./app-material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LdapManagementModule } from './ldap-management/ldap-management.module';



@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    LdapManagementModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})



export class AppModule { }

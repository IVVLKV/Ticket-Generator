import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { appRouting } from './app.routes';
import { AppComponent } from './app.component';

import { AuthenticationModule } from './authentication/authentication.module'
import { ApiModule } from './api/api.module'

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    appRouting,
    BrowserModule,
    AuthenticationModule,
    ApiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

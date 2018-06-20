import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClipboardModule } from 'ngx-clipboard';

import { GeneratorComponent } from './generator.component';
import { ClientsComponent } from './clients/clients.component';
import { AddClientComponent } from './clients/add-client/add-client.component';

import { GeneratorService } from './generator.service';
import { TicketsListComponent } from './tickets-list/tickets-list.component';
import { TicketsDetailsComponent } from './tickets-details/tickets-details.component';
import { AddTicketComponent } from './tickets-list/add-ticket/add-ticket.component';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    ClipboardModule
  ],
  declarations: [
    GeneratorComponent,
    ClientsComponent,
    TicketsListComponent,
    TicketsDetailsComponent,
    AddClientComponent,
    AddTicketComponent
  ],
  providers: [
    GeneratorService
  ],
  entryComponents: [
    AddClientComponent,
    AddTicketComponent
  ]
})
export class GeneratorModule { }

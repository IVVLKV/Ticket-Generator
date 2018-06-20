import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminModule } from './admin/admin.module';
import { GeneratorModule } from './generator/generator.module';

import { ApiService } from './api.service';
import { WebSocketsService} from './web-sockets.service';
import { TicketsComponent } from './tickets/tickets.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    AdminModule,
    GeneratorModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  declarations: [
    TicketsComponent,
    HomeComponent
  ],
  providers: [
    ApiService,
    WebSocketsService
  ],
})
export class ApiModule { }

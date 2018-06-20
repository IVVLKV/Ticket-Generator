import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UsersComponent } from './users/users.component';
import { AdminInterceptorService } from './admin-interceptor.service';
import { AdminGuardService } from './admin-guard.service';
import { AdminService } from './admin.service';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AdminComponent } from './admin/admin.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { AddUserComponent } from './users/add-user/add-user.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    ColorPickerModule
  ],
  declarations: [
    UsersComponent,
    EditUserComponent,
    AdminComponent,
    AddUserComponent
  ],
  providers: [
    AdminService,
    AdminGuardService,
    { 
      provide: HTTP_INTERCEPTORS,
      useClass: AdminInterceptorService,
      multi: true
    }
  ],
  entryComponents: [
    AddUserComponent
  ]
})
export class AdminModule { }

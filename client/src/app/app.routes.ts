import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { UsersComponent } from './api/admin/users/users.component';
import { EditUserComponent } from './api/admin/edit-user/edit-user.component';
import { AdminComponent } from './api/admin/admin/admin.component';
import { TicketsComponent } from './api/tickets/tickets.component';
import { HomeComponent } from './api/home/home.component';
import { GeneratorComponent } from './api/generator/generator.component';
import { ClientsComponent } from './api/generator/clients/clients.component';

import { TicketsListComponent } from './api/generator/tickets-list/tickets-list.component';
import { TicketsDetailsComponent } from './api/generator/tickets-details/tickets-details.component';

import { AuthGuardService } from './authentication/auth-guard.service';
import { AdminGuardService } from './api/admin/admin-guard.service';

const appRoutes: Routes = [
  { path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService], children: [
      { path: 'tickets/:state', component: TicketsComponent },
      { path: 'admin', component: AdminComponent, canActivate: [AdminGuardService], children: [
        { path: 'users', component: UsersComponent },
        { path: 'edit/:userId', component: EditUserComponent }
      ]},
      { path: 'generator', component: GeneratorComponent, children: [
        { path: ':clientAbbr', component: TicketsListComponent, children: [
            { path: ':ticketID', component: TicketsDetailsComponent }
        ]}
    ]},
  ]},  

  { path: '**', redirectTo: 'home',  pathMatch: 'full' }
]

export const appRouting = RouterModule.forRoot(appRoutes);

import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { AuthService } from './auth.service';
import { environment } from '../../environments/environment'

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router, private http: HttpClient) { }

  path = environment.path + '/authentication'
  
  canActivate() {
        if (this.auth.token()) {
            return this.http.get<any>(this.path + '/role/').map(res => {
                return !!res.role
            })
        } else {
            this.router.navigate(['/login'])
        }
  }
}

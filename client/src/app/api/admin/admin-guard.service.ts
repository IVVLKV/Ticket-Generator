import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../../authentication/auth.service';
import { environment } from '../../../environments/environment'

@Injectable()
export class AdminGuardService implements CanActivate {

    path = environment.path + '/authentication'
    
    constructor(private auth: AuthService, private http: HttpClient) { }
    
    canActivate() {
        return this.http.get<any>(this.path + '/role/').map(res => {
            return res.role === 'admin'
            // if(res.role !== 'admin') {
            //     return false
            // } else {
            //     return true
            // }
        })
    }

}

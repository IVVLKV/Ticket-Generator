import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http'

import { AuthService } from './auth.service'

@Injectable()
export class AuthorizationInterceptorService implements HttpInterceptor {

    constructor(private injector: Injector) {}
  
    intercept(req, next) {
        var auth = this.injector.get(AuthService)
        
        var token = auth.token()
        if(token) {
            var authRequest = req.clone({
                headers: req.headers.set('Authorization', 'token ' + auth.token())
            })
            return next.handle(authRequest)
        }
        var tst = req.clone({
            // headers: req.headers.set('Authorization', 'token ' + auth.token())
        })
        return next.handle(tst)
    }

}

import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http'

import { AdminService } from './admin.service'

@Injectable()
export class AdminInterceptorService implements HttpInterceptor {

    constructor(private injector: Injector) {}
  
    intercept(req, next) {
        var admin = this.injector.get(AdminService)
        var adminRequest = req.clone({
            headers: req.headers.set('Authorization', 'token ' + admin.token())
        })
        return next.handle(adminRequest)
    }
}

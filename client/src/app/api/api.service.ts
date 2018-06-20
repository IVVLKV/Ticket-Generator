import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment'

@Injectable()
export class ApiService {

    constructor(private http: HttpClient, private router: Router) { }

    path = environment.path
    users = []

    getUsers() {
        this.http.get<any>(this.path + '/data/users').subscribe(res => {
            this.users = res
        })
    }

    getActiveTickets() {
        return this.http.get<any[]>(this.path + '/tickets?active=true')
    }
    getInactiveTickets() {
        return this.http.get<any[]>(this.path + '/tickets?active=false')
    }

    addTicket(formValue) {
        this.http.post(this.path + '/tickets/', formValue)
        .subscribe (data => {
            // this.push.addTicket(data);
            this.router.navigate(['/tickets']).then(() => {
                // this.notification.notification('New ticket added successfuly', null)
            });
        },
        (err) => {
            console.log(err)
        })
    }

    getTicket(id) {
        return this.http.get(this.path + '/tickets/' + id)
    }

    updateTicket(id, formValue) {
        this.http.put(this.path + '/tickets/' + id, formValue)
        .subscribe (data => {
            // this.push.updateTicket(this.ticketInfo);
            this.router.navigate(['/tickets']).then(() => {
                // this.notification.notification('Ticket updated', null)
            });
        },
        (err) => {
            console.log(err)
        })
    }

    deleteTicket(id) {
        this.http.delete(this.path + '/tickets/' + id)
        .subscribe (data => {
            // this.ticketInfo = data
            // this.push.deleteTicket(this.ticketInfo);
            this.router.navigate(['/tickets']).then(() => {
                // this.notification.notification('Ticket deleted', null)
            });
        },
        (err) => {
            console.log(err)
        })
    }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment'

@Injectable()
export class GeneratorService {

  constructor(private http: HttpClient, private router: Router) { }

  path = environment.path + '/generator'

  getClients() {
      return this.http
      .get<any>(this.path + '/client')
  }

  getTickets(clientAbbr) {
      return this.http
      .get<any>(this.path + '/ticket?clientAbbr=' + clientAbbr)
  }

  getTicket(ticketID) {
      return this.http
      .get<any>(this.path + '/ticket/' + ticketID)
  }

  addClient(formValue) {
      return this.http
      .post(this.path + '/client', formValue)
  }

  addTicket(formValue) {
      return this.http
      .post(this.path + '/ticket', formValue)
  }

  removeTicket(id) {
    if(confirm("Remove ticket?")) {
        return this.http.delete(this.path + '/ticket/' + id)
    }
  }
}

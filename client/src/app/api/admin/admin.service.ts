import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment'

@Injectable()
export class AdminService {

  constructor(private http: HttpClient, private router: Router) { }

  path = environment.path + '/admin'
  users

  getUsers() {
      return this.http.get<any>(this.path + '/users')
  }

  getUser(userId) {
    return this.http.get<any>(this.path + '/edit/' + userId)
  }

  updateUser(userId, data) {
    this.http.patch(this.path + '/edit/' + userId, data).subscribe(res => {
      this.router.navigate(['/home/admin/users'])
    }),
    err => { console.log(err.error.message) }
  }

  deleteUser(userId) {
    if(confirm("Delete user?")) {
      this.http.delete(this.path + '/remove/' + userId).subscribe(res => {
        this.router.navigate(['/home/admin/users'])
      }),
      err => { console.log(err.error.message) }
    }
  }

  addUser(registerData) {
      return this.http.post<any>(environment.path + '/authentication' + '/register', registerData)
  }

  token() {
      return localStorage.getItem('token')
  }

}

import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  err

  loginForm = new FormGroup ({
    email: new FormControl(),
    password: new FormControl()
  });

  constructor(private auth: AuthService) { }

  login() {
      this.auth.loginUser(this.loginForm.value).subscribe(res => {
          this.auth.loginAction(res)
      },
      err => {
          console.log(err.error.message)
          this.err = err.error.message
      })
  } 

}

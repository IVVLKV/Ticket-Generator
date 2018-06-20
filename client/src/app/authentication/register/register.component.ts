import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  err

  registerForm = new FormGroup ({
    name: new FormControl(),
    email: new FormControl(),
    password: new FormControl()
  });

  constructor(private auth: AuthService) { }

  register() {
    this.auth.registerUser(this.registerForm.value).subscribe(res => {
        this.auth.loginAction(res)
    },
    err => {
        console.log(err.error.message)
        this.err = err.error.message
    })
  } 

}

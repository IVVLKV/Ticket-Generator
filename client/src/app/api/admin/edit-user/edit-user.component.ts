import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../admin.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user

  userData = new FormGroup ({
    name: new FormControl(Validators.required),
    email: new FormControl(Validators.required),
    role: new FormControl(Validators.required),
    bckgColor: new FormControl(Validators.required),
    textColor: new FormControl(Validators.required)
  })
  constructor(private route: ActivatedRoute, private adminService: AdminService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.adminService.getUser(params["userId"]).subscribe(res => {
          this.user = res
          this.userData.setValue({
            name: this.user.name,
            email: this.user.email,
            role: this.user.role,
            bckgColor: this.user.bckgColor,
            textColor: this.user.textColor
          });
        })
      }
    );
  }

  changeColor(color: string, controlName: string) {
      let colorControl = this.userData.get(controlName) as FormControl;
      colorControl.setValue(color);
      colorControl.markAsDirty();
      colorControl.markAsTouched();
  }

  currentColor(controlName) {
    return this.userData.get(controlName).value || '#fff'
  }

  updateUser() {
      this.adminService.updateUser(this.user._id, this.userData.value)
  }

  deleteUser(id) {
      this.adminService.deleteUser(id)
  }

}

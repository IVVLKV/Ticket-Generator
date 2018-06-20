import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  form: FormGroup;
  errorText

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddUserComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
      this.dialogRef.close();
    }

    ngOnInit() {
      this.form = this.fb.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
      });
    }

    save() {
      this.adminService.addUser(this.form.value)
        .subscribe(res => {
            this.dialogRef.close();
            this.router.navigate(['/home/admin/edit/' + res.id])
        },
        err => {
            console.log(err.error.message)
            this.errorText = err.error.message
        })
    }

    close() {
      this.dialogRef.close();
    }

}

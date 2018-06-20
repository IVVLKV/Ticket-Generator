import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { AddUserComponent } from './add-user/add-user.component';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  usersList: Array<object>

  constructor(private adminService: AdminService, private dialog: MatDialog) { }

  ngOnInit() {
    this.adminService.getUsers().subscribe(res => {
      this.usersList = res
    }),
    err => { console.log(err.error.message) }
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(AddUserComponent, dialogConfig);
  }

}

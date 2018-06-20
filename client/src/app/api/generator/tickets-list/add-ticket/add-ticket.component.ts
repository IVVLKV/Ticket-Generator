import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GeneratorService } from '../../generator.service';
import { GeneratorComponent } from '../../generator.component';

import { WebSocketsService } from '../../../web-sockets.service';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.css']
})
export class AddTicketComponent implements OnInit {

  form: FormGroup;
  errorText
  client

  constructor(
    private generatorService: GeneratorService,
    private fb: FormBuilder,
    private socket: WebSocketsService,
    public dialogRef: MatDialogRef<AddTicketComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {  
      this.client = data.client
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    ngOnInit() {
      this.form = this.fb.group({
        name: ['', Validators.minLength(2)],
        clientAbbr: this.client
      });
    }

    save() {
      this.generatorService.addTicket(this.form.value)
        .subscribe(res => {
          console.log(res)
            this.socket.addTicket(res)
            this.dialogRef.close();
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

import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GeneratorService } from '../../generator.service';

import { WebSocketsService } from '../../../web-sockets.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  form: FormGroup;
  errorText

  constructor(
    private generatorService: GeneratorService,
    private fb: FormBuilder,
    private socket: WebSocketsService,
    public dialogRef: MatDialogRef<AddClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
      this.dialogRef.close();
    }

    ngOnInit() {
      this.form = this.fb.group({
        name: ['', Validators.minLength(2)],
        abbr: ['', Validators.minLength(2)]
      });
    }

    save() {
      this.generatorService.addClient(this.form.value)
        .subscribe(res => {
            this.socket.addClient(res)
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

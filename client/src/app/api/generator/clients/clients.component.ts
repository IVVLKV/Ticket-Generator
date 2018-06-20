import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddClientComponent } from './add-client/add-client.component';
import { Observable } from 'rxjs';

import { GeneratorService } from '../generator.service';
import { WebSocketsService } from '../../web-sockets.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  currentClient
  clients
  connection
  fileredClients

  constructor(private generatorService: GeneratorService, private activatedRoute: ActivatedRoute, private dialog: MatDialog, private socket: WebSocketsService) { }

  ngOnInit() {
    this.connection = this.socket.webSocket().subscribe(data => {
      if(data['client']) {
        this.clients.push(data['client'])
      }
    })
    this.activatedRoute.params.subscribe( params => {
        this.currentClient = params['clientAbbr']
        this.generatorService
          .getClients()
          .subscribe(data => {
            this.clients = data
            this.fileredClients = Observable.of(this.clients)
          })
    })
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(AddClientComponent, dialogConfig);
  }

  onKeyUp(value) {
    this.fileredClients = Observable.of(this.clients)
    .map(data => { 
        return data.filter(client => client.name.toLowerCase().indexOf(value.toLowerCase())>-1);
    });
  }

}

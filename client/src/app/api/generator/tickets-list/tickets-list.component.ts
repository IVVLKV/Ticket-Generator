import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AddTicketComponent } from './add-ticket/add-ticket.component'
import { Router } from '@angular/router';

import { GeneratorService } from '../generator.service';
import { WebSocketsService } from '../../web-sockets.service';

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.css']
})
export class TicketsListComponent implements OnInit {

  connection
  currentClient

  displayedColumns = ['number', 'name', 'date'];
  dataSource: MatTableDataSource<Ticket>;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private generatorService: GeneratorService, private activatedRoute: ActivatedRoute, private dialog: MatDialog, private socket: WebSocketsService) {}

  ngOnInit() {
    this.connection = this.socket.webSocket().subscribe(data => {
      if(data['ticket']) {
        this.generatorService.getTickets(this.currentClient)
          .subscribe(data => {
            this.dataSource = new MatTableDataSource(data)
            this.dataSource.sort = this.sort;
          })
      }
    })
    this.activatedRoute.params.subscribe( params => {
        this.currentClient = params['clientAbbr']
        this.generatorService.getTickets(this.currentClient)
          .subscribe(data => {
            this.dataSource = new MatTableDataSource(data)
            this.dataSource.sort = this.sort;
          })
    })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
        client: this.currentClient
    };

    this.dialog.open(AddTicketComponent, dialogConfig);
  }

  deleteTicket(event: Event, id) {
    event.stopPropagation();
    this.generatorService.removeTicket(id).subscribe(res => {
        this.router.navigate(['/home/generator/' + this.currentClient])
        this.socket.delTicket(res)
    }),
    err => { console.log(err.error.message) }
  }

}

export interface Ticket {
  name: string;
  number: string;
  date: string;
  clientAbbr: string;
}

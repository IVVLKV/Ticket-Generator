import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeneratorService } from '../generator.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-tickets-details',
  templateUrl: './tickets-details.component.html',
  styleUrls: ['./tickets-details.component.css']
})
export class TicketsDetailsComponent implements OnInit {

  ticket

  constructor(private generatorService: GeneratorService, private activatedRoute: ActivatedRoute, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe( params => {
        this.generatorService
          .getTicket(params['ticketID'])
          .subscribe(data => {
            this.ticket = data
        })
    })
  }

  openSnackBar(copy) {
    this.snackBar.open(copy + ' Copied.', '', {
      duration: 3000
    });
  }

}

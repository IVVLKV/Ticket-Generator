import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DataSource } from '@angular/cdk/collections';
import { ApiService } from '../api.service';
import { MatSort } from '@angular/material';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  displayedColumns = ['number', 'status', 'deadline', 'category', 'dev', 'qa', 'priority', 'designer', 'files', 'notes' ];
  exampleDatabase: ExampleHttpDao | null;
  dataSource: ExampleDataSource | null;

  pageTitle

  @ViewChild(MatSort) sort: MatSort;

  constructor(private apiService: ApiService, private router: Router, private activatedRoute: ActivatedRoute) {}
  
  ngOnInit() {
    this.changeRoute()
    let params = this.activatedRoute.snapshot.params['state'];
    this.switchTicketsState(params)
  }

  changeRoute() {
    this.router.events
    .filter(event => event instanceof NavigationStart)
    .subscribe((event:NavigationStart) => {
      let paramsArr = event.url.split('/')
      let params = paramsArr[paramsArr.length - 1]
      this.switchTicketsState(params)
    });
  }

  switchTicketsState(params) {
    if (params === 'active' || params === 'archived') {
      (params === 'active') ? this.pageTitle = 'Active Tickets' : this.pageTitle = 'Archived Tickets';
      this.exampleDatabase = new ExampleHttpDao(this.apiService, params);
      this.dataSource = new ExampleDataSource(this.exampleDatabase!, this.sort);
    }
  }

  // editTicket(ticketID) {
  //   this.router.navigate(['/tickets/edit-ticket', { id: ticketID }]);
  // }
}

export class ExampleHttpDao {
  constructor(private apiService: ApiService, private param: String) {}
  
  getTickets() {
    if(this.param === 'active') {
      return this.apiService.getActiveTickets()
    } else if(this.param === 'archived') {
      return this.apiService.getInactiveTickets()
    }
  }
}

export class ExampleDataSource extends DataSource<any> {

  constructor(private exampleDatabase: ExampleHttpDao, private sort: MatSort) {
    super();
  }

  connect(): Observable<any[]> {
    const displayDataChanges = [
      this.sort.sortChange
    ];

    return Observable.merge(...displayDataChanges)
      .startWith(null)
      .switchMap(() => {
        return this.exampleDatabase.getTickets()
      })
      .map(data => {
        if (!this.sort.active || this.sort.direction == '') { return data; }

        return data.sort((a, b) => {
          let propertyA: number|string|Date = '';
          let propertyB: number|string|Date = '';

          switch (this.sort.active) {
            case 'number': [propertyA, propertyB] = [a.number, b.number]; break;
            case 'status': [propertyA, propertyB] = [a.status, b.status]; break;
            case 'requestor': [propertyA, propertyB] = [a.requestor, b.requestor]; break;
            case 'dev': [propertyA, propertyB] = [a.dev, b.dev]; break;
            case 'qa': [propertyA, propertyB] = [a.qa, b.qa]; break;
            case 'priority': [propertyA, propertyB] = [a.priority, b.priority]; break;
            case 'designer': [propertyA, propertyB] = [a.designer, b.designer]; break;
            case 'deadline': [propertyA, propertyB] = [new Date(a.deadline), new Date(b.deadline)]; break;
          }

          let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
          let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

          return (valueA < valueB ? -1 : 1) * (this.sort.direction == 'asc' ? 1 : -1);
        });
      })
  }

  disconnect() {}

}

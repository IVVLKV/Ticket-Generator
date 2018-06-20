import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

import { environment } from '../../environments/environment'

@Injectable()
export class WebSocketsService {

  private url = environment.path
  private socket;

  public connection;

  constructor() { }

  addClient(clientData){
    this.socket.emit('generatorAddClient', clientData);    
  }
  addTicket(ticketData){
    this.socket.emit('generatorAddTicket', ticketData);    
  }
  delTicket(ticketData){
    this.socket.emit('generatorDelTicket', ticketData);    
  }

  webSocket() {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('generatorAddClient', (data) => {
        observer.next(data);    
      });
      this.socket.on('generatorAddTicket', (data) => {
        observer.next(data);    
      });
      this.socket.on('generatorDelTicket', (data) => {
        observer.next(data);    
      });
      return () => {
        this.socket.disconnect();
      };  
    })     
    return observable;
  } 

}

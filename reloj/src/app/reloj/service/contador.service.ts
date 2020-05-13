import { Injectable } from '@angular/core';
import { timer, Observable } from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContadorService {

  cuanta: number = 0;
  contador: Observable<number>

  constructor() {
    // this.contador = timer(0,1000).pipe(map(t => new Date()),shareReplay(1));
    this.contador = timer(0,1000).pipe(map(t => this.cuanta++ ,shareReplay(1)));
  }

  getContador(): Observable<number> {
    return this.contador;
  }
}

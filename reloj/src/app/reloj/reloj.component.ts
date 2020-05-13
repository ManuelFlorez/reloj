import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ContadorService } from './service/contador.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-reloj',
  templateUrl: './reloj.component.html',
  styleUrls: ['./reloj.component.css']
})
export class RelojComponent implements OnInit, OnDestroy {

  reloj: string;
  contador: number;


  @Input() tiempo: number;
  minutos: number;
  tiempoEnSegundos: number;
  contador$: Observable<number>;
  clientesSubscription: Subscription;

  segundos: number;

  rojo:boolean = false;

  constructor(private _contador: ContadorService) {
    this.reloj = '00:';
  }

  ngOnInit(): void {
    this.tiempoEnSegundos = this.tiempo * 60;
    this.minutos = this.tiempo - 1;
    this.segundos = 60;
    this.contador$ = this._contador.getContador();
    this.clientesSubscription = this.contador$.subscribe(cont => {

      if(cont === this.tiempoEnSegundos) {
        this.minutos = 0;
        this.segundos = 0;
        this.clientesSubscription.unsubscribe();
        return;
      }

      if((this.tiempoEnSegundos - cont) === 30) {
        this.rojo = true;
      }

      this.segundos--;
      if( this.segundos === 0 && this.minutos === 0) {
        return;
      }
      
      if (this.segundos === 0) {
        this.segundos = 60;
        this.minutos--;
      }
      this.contador = cont;
    });
  }

  ngOnDestroy(): void {
    this.clientesSubscription.unsubscribe();
  }

}

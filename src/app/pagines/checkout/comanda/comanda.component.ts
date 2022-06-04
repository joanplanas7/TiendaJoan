import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/shared/serveis/carrito.services';

@Component({
  selector: 'app-comanda',
  templateUrl: './comanda.component.html',
  styleUrls: ['./comanda.component.scss']
})
export class ComandaComponent implements OnInit {
  total$ = this.carritoSer.getTotal;
  productes$ = this.carritoSer.getProductes;

  constructor(private carritoSer: CarritoService) { }

  ngOnInit(): void {
  }

}

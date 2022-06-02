import { Component, OnInit } from '@angular/core';
import { ProductesService } from './serveis/productes.service';
import {tap} from 'rxjs/operators'
import { Producte } from './interficies/producte.interface';
import { CarritoService } from 'src/app/shared/serveis/carrito.services';

@Component({
  selector: 'app-productes',
  templateUrl: './productes.component.html',
  styleUrls: ['./productes.component.scss']
})
export class ProductesComponent implements OnInit {
  productes!: Producte[];
  constructor(private producteServei: ProductesService, private carritoSer: CarritoService ) { }

  ngOnInit(): void {
    this.producteServei.getProductes()
      .pipe(
        tap ((pro: Producte[]) => this.productes = pro)
      ).subscribe();
  }

  afegirCarrito(producte: Producte):void{
    this.carritoSer.updateCarr(producte);
  }
}

import { Component, OnInit } from '@angular/core';
import { ProductesService } from './serveis/productes.service';
import {tap} from 'rxjs/operators'
import { Producte } from './interficies/producte.interface';

@Component({
  selector: 'app-productes',
  templateUrl: './productes.component.html',
  styleUrls: ['./productes.component.scss']
})
export class ProductesComponent implements OnInit {
  productes!: Producte[];
  constructor(private producteServei: ProductesService) { }

  ngOnInit(): void {
    this.producteServei.getProductes()
      .pipe(
        tap ((pro: Producte[]) => this.productes = pro)
      ).subscribe();
  }

  afegirCarrito(producte: Producte):void{
    console.log("funcioa", producte);
  }
}

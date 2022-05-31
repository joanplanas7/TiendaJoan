import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { Producte } from '../interficies/producte.interface';

@Component({
  selector: 'app-producte',
  templateUrl: './producte.component.html',
  styleUrls: ['./producte.component.scss']
})
export class ProducteComponent implements OnInit {
  @Input() pro!: Producte;
  @Output() afegirCarritoClick = new EventEmitter<Producte>();
  constructor() { }

  ngOnInit(): void {
  }

  onClick():void{
    this.afegirCarritoClick.emit(this.pro);
  }

}

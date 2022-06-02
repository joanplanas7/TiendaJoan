import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import { Producte } from '../interficies/producte.interface';

@Component({
  selector: 'app-producte',
  templateUrl: './producte.component.html',
  styleUrls: ['./producte.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class ProducteComponent {
  @Input() pro!: Producte;
  @Output() afegirCarritoClick = new EventEmitter<Producte>();
  constructor() { }


  onClick():void{
    this.afegirCarritoClick.emit(this.pro);
  }

}

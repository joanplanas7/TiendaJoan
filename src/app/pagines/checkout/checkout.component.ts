import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Tenda } from 'src/app/shared/interficies/tendas.interfice';
import { TendasService } from 'src/app/shared/serveis/tendas.services';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  model = {
    nom:'',
    entregaForma: '',
    adress: '',
    ciutat: '',
    botiga:''
  }
  metodeEntrega: boolean = true;
  tendas: Tenda[] = []
  constructor(private tendaServei: TendasService) { }

  ngOnInit(): void {
    this.getTendas();
  }

  entrega(valor: boolean): void{
    this.metodeEntrega = valor;
  }
  enviarForm(): void{
    
  }

  private getTendas():void{
    this.tendaServei.getTendas()
      .pipe(
          tap((tendas:Tenda[]) => this.tendas = tendas))
      .subscribe();
  }

}

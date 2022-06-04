import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';
import { Comanda } from 'src/app/shared/interficies/comanda.interfice';
import { Detalls } from 'src/app/shared/interficies/detalls.interfice';
import { Tenda } from 'src/app/shared/interficies/tendas.interfice';
import { CarritoService } from 'src/app/shared/serveis/carrito.services';
import { PedidosService } from 'src/app/shared/serveis/pedidos.service';
import { TendasService } from 'src/app/shared/serveis/tendas.services';
import { Producte } from '../productes/interficies/producte.interface';

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
  carrito: Producte[] = [];
  constructor(private tendaServei: TendasService, private comandaServei: PedidosService, private carritoServei: CarritoService) { }

  ngOnInit(): void {
    this.getTendas();
    this.getCarrito();
  }

  entrega(valor: boolean): void{
    this.metodeEntrega = valor;
  }

  enviarForm({value: comandaUser}: NgForm ): void{
    const comanda: Comanda = {
      ...comandaUser,
      date: this.getDataActual(),
      pickup: this.metodeEntrega
    }

    this.comandaServei.guardarPedido(comanda)
    .pipe(
        tap((res) => console.log(res)),
        switchMap ((comanda) =>{
          const detalls = this.prepararDetalls();
          const orderId = comanda.id;
          return this.comandaServei.guardarDetallsComanda({details:detalls, orderId});
        }),
        tap((res) => console.log("Ha acabat", res)),
    )
    .subscribe();
  }

  private getTendas():void{
    this.tendaServei.getTendas()
      .pipe(
          tap((tendas:Tenda[]) => this.tendas = tendas))
      .subscribe();
  }

  private getDataActual(): String{
    return new Date().toLocaleDateString();
  }

  private prepararDetalls(): Detalls[]{
    const detalls : Detalls[] = [];
    this.carrito.forEach( res => {
        console.log(res);
    });
    
    return detalls;
  }

  private getCarrito(): void {
     this.carritoServei.getProductes
    .pipe(
      tap((productes: Producte[]) => this.carrito = productes)
    )
    .subscribe();
  }

}

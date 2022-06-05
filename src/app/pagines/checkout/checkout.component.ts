import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { delay, switchMap, tap } from 'rxjs/operators';
import { Comanda } from 'src/app/shared/interficies/comanda.interfice';
import { Detalls } from 'src/app/shared/interficies/detalls.interfice';
import { Tenda } from 'src/app/shared/interficies/tendas.interfice';
import { CarritoService } from 'src/app/shared/serveis/carrito.services';
import { PedidosService } from 'src/app/shared/serveis/pedidos.service';
import { TendasService } from 'src/app/shared/serveis/tendas.services';
import { Producte } from '../productes/interficies/producte.interface';
import { ProductesService } from '../productes/serveis/productes.service';

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
  metodeEntrega: boolean = false;
  tendas: Tenda[] = []
  carrito: Producte[] = [];
  constructor(
    private tendaServei: TendasService, 
    private comandaServei: PedidosService, 
    private carritoServei: CarritoService,
    private producteServei: ProductesService,
    private rutes: Router
    ) { 
      this.carritoBuit();
    }

  ngOnInit(): void {
    this.getTendas();
    this.getCarrito();
    this.prepararDetalls();
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
        switchMap (({id:orderId}) =>{
          const detalls = this.prepararDetalls();
          return this.comandaServei.guardarDetallsComanda({details:detalls, orderId});
        }),
        tap(() => this.rutes.navigate(['/checkout/gracies'])),
        delay(2500),
        tap(() => this.carritoServei.resterCarrito()),
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
    this.carrito.forEach( (prod:Producte) => {
        const  {id: idProd, name: nomProd, qty:quantitat, stock} = prod;

        const actStock = (stock-quantitat);  
        this.producteServei.actStock(prod.id, actStock)
          .pipe(
            tap(()=> detalls.push({productId:idProd, productName:nomProd, quantity: quantitat}))
          )
          .subscribe();


        
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

  private carritoBuit():void{
    this.carritoServei.getProductes
      .pipe(
        tap((prod: Producte[])=> {
          if(Array.isArray(prod) && !prod.length){
            this.rutes.navigate(["/productes"]);
          }
        })
      )
      .subscribe();
  }

}

import { Component } from "@angular/core";
import { CarritoService } from "src/app/shared/serveis/carrito.services";

@Component({
    selector: 'app-carrito',
    template: `
        <ng-container *ngIf="{total: total$ | async, quantitat:quantitat$ | async} as dades">
            <ng-container *ngIf="dades.total; else vacio">
                <mat-icon>add_shopping_cart</mat-icon>
                {{dades.total | currency}}
                ({{dades.quantitat}})
            </ng-container>
        </ng-container> 

        <ng-template #vacio>
                <mat-icon>add_shopping_cart</mat-icon>
                {{0 | currency}}
                ({{0}})
        </ng-template>
        `
})

export class CarritoComponent{
   
    quantitat$ = this.carritoSer.getQuantitat;
    total$ = this.carritoSer.getTotal;
    carrito$ = this.carritoSer.getProductes; 

    constructor(private carritoSer: CarritoService){}
}
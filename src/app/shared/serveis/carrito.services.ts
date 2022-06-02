import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Producte } from "src/app/pagines/productes/interficies/producte.interface";

@Injectable(
    {providedIn: "root"}
)

export class CarritoService{
    productes: Producte[] = [];

    private productesSub = new Subject<Producte[]>();
    private totalProducteSub = new Subject<number>();
    private quantitatSub = new Subject<number>();

    //getters
    get getTotal(): Observable<number>{
        return this.totalProducteSub.asObservable();
    }
    get getQuantitat(): Observable<number>{
        return this.quantitatSub.asObservable();
    }
    get getProductes(): Observable<Producte[]>{
        return this.productesSub.asObservable();
    }
    
    //metode que crida el component
    public updateCarr(producte: Producte): void{
        this.afegirCarr(producte);
        this.quantitatProductes();
        this.calcTotal();

    }
    

    //metodes privats per la gestio del carrito
    private quantitatProductes(): void{
        const quantitatProd = this.productes.length;
        this.quantitatSub.next(quantitatProd);
    }

    private calcTotal(): void{
        const total = this.productes.reduce((tot, prod)=> tot += prod.price,0);
        this.totalProducteSub.next(total);
    }

    private afegirCarr(producte:Producte): void{
        this.productes.push(producte);
        this.productesSub.next(this.productes);
    }
}


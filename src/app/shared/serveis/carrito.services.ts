import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable} from "rxjs";
import { Producte } from "src/app/pagines/productes/interficies/producte.interface";

@Injectable(
    {providedIn: "root"}
)

export class CarritoService{
    productes: Producte[] = [];

    private productesSub = new BehaviorSubject<Producte[]>([]);
    private totalProducteSub = new BehaviorSubject<number>(0);
    private quantitatSub = new BehaviorSubject<number>(0);

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
        const quantitatProd = this.productes.reduce((tot, prod)=> tot += prod.qty,0);
        this.quantitatSub.next(quantitatProd);
    }

    private calcTotal(): void{
        const total = this.productes.reduce((tot, prod)=> tot += (prod.price * prod.qty),0);
        this.totalProducteSub.next(total);
    }

    private afegirCarr(producte:Producte): void{
        const repetit = this.productes.find(({id}) => id == producte.id);
        if(repetit){
            repetit.qty += 1;
        }else{
            producte.qty = 1;
            this.productes.push(producte);
        }
        this.productesSub.next(this.productes);
    }
}


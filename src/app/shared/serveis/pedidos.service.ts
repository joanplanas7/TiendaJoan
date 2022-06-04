import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Comanda } from "../interficies/comanda.interfice";
import { DetallsComanda } from "../interficies/detallsComanda.interfice";

@Injectable({
    providedIn: 'root'
})

export class PedidosService{
    private api = " http://localhost:7070";
    constructor(private http : HttpClient){}

    guardarPedido(comanda: Comanda): Observable<Comanda>{
        return this.http.post<Comanda>(`${this.api}/comandes`, comanda);
    }

    guardarDetallsComanda(detalls: DetallsComanda): Observable<DetallsComanda>{
        return this.http.post<DetallsComanda>(`${this.api}/detailsOrders`, detalls);
    }
}
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Tenda } from "../interficies/tendas.interfice";

@Injectable({
    providedIn: 'root'
})

export class TendasService{
    private api = " http://localhost:7070/tendas";
    constructor(private http : HttpClient){}

    getTendas():Observable<Tenda[]>{
        return this.http.get<Tenda[]>(this.api); 
    }
}
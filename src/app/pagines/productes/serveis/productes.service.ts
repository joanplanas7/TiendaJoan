import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producte } from '../interficies/producte.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductesService{
  private urlApi = "http://localhost:7070/productes";
  constructor(private http: HttpClient) { 

  }

  getProductes():Observable<Producte[]>{
    return this.http.get<Producte[]>(this.urlApi);
  }
}

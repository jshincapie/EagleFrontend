import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  url = 'http://localhost:8080/Eagle/backend/controlador/compra.php';

  constructor(private http: HttpClient) { }

  consulta(){
    return this.http.get(`${this.url}?control=consulta`);
  }

  consultarp(id:number){
    return this.http.get(`${this.url}?control=productos&id=${id}`);
  }

  anular(id:number){
    return this.http.get(`${this.url}?control=anular&id=${id}`);
  }

  eliminar(id:number){
    return this.http.get(`${this.url}?control=eliminar&id=${id}`);
  }
  
  insertar(params:any){
    return this.http.post(`${this.url}?control=insertar`, JSON.stringify(params));
  }

  editar(id:number, params:any){
    return this.http.post(`${this.url}?control=editar&id=${id}`, JSON.stringify(params));
  }

  filtro(dato:any){
    return this.http.get(`${this.url}?control=filtro$dato${dato}`);
  }


}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  url = 'http://localhost:8080/Eagle/backend/controlador/producto.php';


  constructor(private http: HttpClient) { }

  consulta(){
    return this.http.get(`${this.url}?control=consulta`);
  }

  restar_productosp(id:number, cant:number){
    return this.http.get(`${this.url}?control=restarp&id=${id}&cant=${cant}`);
  }

  agregar_productosp(id:number, cant:number){
    return this.http.get(`${this.url}?control=sumarp&id=${id}&cant=${cant}`);
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

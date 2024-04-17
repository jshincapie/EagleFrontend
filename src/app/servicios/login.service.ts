import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class LoginService {

url='http://localhost:8080/Eagle/backend/controlador/login.php';

  constructor(private http: HttpClient) { }

  consulta (correo:any, password:any){
    // console.log(`${this.url}?correo=${correo}&password=${password}`);
    return this.http.get(`${this.url}?correo=${correo}&password=${password}`);
  }
}

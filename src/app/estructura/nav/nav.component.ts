import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  nombre:any;
  rol:any;

  constructor(private router:Router) {}

  ngOnInit():void{
    this.nombre= sessionStorage.getItem("nombre");
    this.rol=sessionStorage.getItem("rol")
  }


  cerrar(){
    sessionStorage.setItem("id","");
    sessionStorage.setItem("correo","");
    sessionStorage.setItem("nombre","");
    sessionStorage.setItem("rol","");
    this.router.navigate(['login']);
  }

}

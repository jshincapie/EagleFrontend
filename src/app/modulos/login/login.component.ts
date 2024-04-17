import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
  
  
})


export class LoginComponent {

 
  correo:any;
  password:any;
  error=false;
  usuario:any;

  

  user={
    nombre:"",
    cedula:"",
    telefono:"",
    direccion:"",
    correo:"",
    password:"",
    foidrol:0
  }

 
  constructor(
    private slogin:LoginService, 
    private router: Router,
      
  ){}



  ngOnInit():void{
    sessionStorage.setItem("id","");
    sessionStorage.setItem("correo","");
    sessionStorage.setItem("nombre","");
    sessionStorage.setItem("rol","");
   
  }

  consulta(tecla:any){
    
    if(tecla==13 || tecla==""){
      
      this.slogin.consulta(this.correo, this.password).subscribe((resultado:any) => {
        this.usuario =resultado;
        // console.log(this.usuario);
        if(this.usuario[0].validar=="valida"){
          sessionStorage.setItem("id",this.usuario[0]['id_usuario']);
           sessionStorage.setItem("correo",this.usuario[0]['correo']);
           sessionStorage.setItem("nombre",this.usuario[0]['nombre']);
           sessionStorage.setItem("rol",this.usuario[0]['foidrol']);

           this.router.navigate(['dashboard']);
           
        }else{
          console.log("no entro");
          this.error=true;
        }
      })
    }
  }
  
  
    
}


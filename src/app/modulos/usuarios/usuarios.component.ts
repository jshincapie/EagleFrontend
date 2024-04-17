import { Component } from '@angular/core';
import { RolService } from 'src/app/servicios/rol.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from  'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {
  
  usuario: any;
  rol:any;
  id_usuario: any;

  obj_usuario= {
    nombre:"",
    cedula:"",
    telefono:"",
    direccion:"",
    correo:"",
    password:"",
    foidrol:0
  }

  
  validar_nombre=true;
  validar_cedula=true;
  validar_telefono=true;
  validar_direccion=true;
  validar_correo=true;
  validar_password=true;
  validar_foidrol=true;
  mform=false;
  botones_form=false;


  constructor(private susuario:UsuarioService, private urol:RolService){}

  ngOnInit(): void{
    this.consulta();
    this.consulta_r();

  }

  consulta(){
    this.susuario.consulta().subscribe((resultado:any)=> {
    this.usuario=resultado;
    
    })
  }

  // Consulta para ID rol llasveforanea
  consulta_r(){
    this.urol.consulta().subscribe((resultado:any)=> {
    this.rol=resultado;
   
    })
  }

  // Ocultar formulario
  mostrar_form(dato:any){
    switch(dato){
      case "ver":
        this.mform=true;
      break;
      case"No ver":
        this.mform=false;
        this.botones_form=false;
      break;
    }
  }

  // Limpiar Form
  limpiar(){
    this.obj_usuario= {
      nombre:"",
      cedula:"",
      telefono:"",
      direccion:"",
      correo:"",
      password:"",
      foidrol:0
    }
  }


  // Validacion del formulario
  validar(funcion:any){
    if(this.obj_usuario.nombre == ""){
      this.validar_nombre = false;
    }else{
      this.validar_nombre=true;
    }

    if(this.obj_usuario.cedula == ""){
      this.validar_cedula = false;
    }else{
      this.validar_cedula=true;
    }

    if(this.obj_usuario.telefono == ""){
      this.validar_telefono = false;
    }else{
      this.validar_telefono=true;
    }

    if(this.obj_usuario.direccion == ""){
      this.validar_direccion = false;
    }else{
      this.validar_direccion=true;
    }

    if(this.obj_usuario.correo == ""){
      this.validar_correo = false;
    }else{
      this.validar_correo=true;
    }

    if(this.obj_usuario.password == ""){
      this.validar_password = false;
    }else{
      this.validar_password=true;
    }

    if(this.obj_usuario.foidrol == 0){
      this.validar_foidrol = false;
    }else{
      this.validar_foidrol=true;
    }

    if(this.validar_nombre ==true && this.validar_cedula==true && this.validar_telefono==true&& this.validar_direccion==true&& this.validar_correo==true&&this.validar_password==true && this.validar_foidrol==true && funcion=='guardar'){
      this.guardar();
    }
    if(this.validar_nombre ==true && this.validar_cedula==true && this.validar_telefono==true&& this.validar_direccion==true&& this.validar_correo==true&&this.validar_password==true && this.validar_foidrol==true && funcion=='editar'){
      this.editar();
    }
  }

  // Guarda informacion dentro de BD
  guardar(){

    this.susuario.insertar(this.obj_usuario).subscribe((datos:any) => {
      if(datos['resultado']=='OK'){
        this.consulta();
      }

    });
    this.limpiar();
    this.mostrar_form('No ver');
    
  }

  // Eliminar

  eliminar(id:number){
    // console.log(id);
    // Alerta
    Swal.fire({
      title: "Estas seguro de eliminar este usuario?",
      text: "Este cambio no podra ser reversado!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!",
      cancelButtonText:"Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        // 
        this.susuario.eliminar(id).subscribe((datos:any) => {
          if(datos['resultado']=='OK'){
            this.consulta();
          }
        })
        // 
        Swal.fire({
          title: "Eliminado!",
          text: "El usuario ha sido eliminado.",
          icon: "success"
        });
      }
    });

    
  }

  // Cargar datos para el editar
  cargar_datos(items:any,id:number){

    this.obj_usuario= {
      nombre: items.nombre,
      cedula: items.cedula,
      telefono:items.telefono,
      direccion:items.direccion,
      correo:items.correo,
      password:items.password,
      foidrol:items.foidrol
    }

    this.id_usuario=id;

    this.botones_form= true;
    this.mostrar_form('ver');

  }
  // Editar datos
  editar(){
    this.susuario.editar(this.id_usuario, this.obj_usuario).subscribe((datos:any)=>{
      if(datos['resultado']=="OK"){
        this.consulta();
      }
    });
    this.limpiar();
    this.mostrar_form('No ver');
  }
}

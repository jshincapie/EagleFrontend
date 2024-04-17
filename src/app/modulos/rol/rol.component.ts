import { Component } from '@angular/core';
import { RolService } from 'src/app/servicios/rol.service';
import Swal from  'sweetalert2';


@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.scss']
})
export class RolComponent {
  
  rol: any;
  id_rol: any;

  obj_rol= {
    nombre_rol:"",
    descripcion_rol:""
  }

  
  validar_nombre_rol=true;
  validar_descripcion_rol=true;
  mform=false;
  botones_form=false;


  constructor(private srol:RolService){}
  
  ngOnInit(): void{
    this.consulta();
   

  }

  consulta(){
    this.srol.consulta().subscribe((resultado:any)=> {
    this.rol=resultado;
    
    })
  }

  // Consulta para ID rol llasveforanea
  

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
    this.obj_rol= {
      nombre_rol:"",
      descripcion_rol:""
    }
  }


  // Validacion del formulario
  validar(funcion:any){
    if(this.obj_rol.nombre_rol == ""){
      this.validar_nombre_rol = false;
    }else{
      this.validar_nombre_rol=true;
    }
    if(this.obj_rol.descripcion_rol == ""){
      this.validar_descripcion_rol = false;
    }else{
      this.validar_descripcion_rol=true;
    }

    if(this.validar_nombre_rol ==true && this.validar_descripcion_rol == true  && funcion=='guardar'){
      this.guardar();
    }
    if(this.validar_nombre_rol ==true && this.validar_descripcion_rol == true   && funcion=='editar'){
      this.editar();
    }
  }

  // Guarda informacion dentro de BD
  guardar(){

    this.srol.insertar(this.obj_rol).subscribe((datos:any) => {
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
      title: "Estas seguro de eliminar este rol?",
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
        this.srol.eliminar(id).subscribe((datos:any) => {
          if(datos['resultado']=='OK'){
            this.consulta();
          }
        })
        // 
        Swal.fire({
          title: "Eliminado!",
          text: "El rol ha sido eliminada.",
          icon: "success"
        });
      }
    });

    
  }

  // Cargar datos para el editar
  cargar_datos(items:any,id:number){

    this.obj_rol= {
      nombre_rol: items.nombre_rol,
      descripcion_rol: items.descripcion_rol
    }

    this.id_rol=id;

    this.botones_form= true;
    this.mostrar_form('ver');

  }
  // Editar datos
  editar(){
    this.srol.editar(this.id_rol, this.obj_rol).subscribe((datos:any)=>{
      if(datos['resultado']=="OK"){
        this.consulta();
      }
    });
    this.limpiar();
    this.mostrar_form('No ver');
  }
}

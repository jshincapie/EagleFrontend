import { Component } from '@angular/core';
import { MarcaService } from 'src/app/servicios/marca.service';
import Swal from  'sweetalert2';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.scss']
})
export class MarcaComponent {
  marca: any;
  id_marca: any;

  obj_marca= {
    nombre:"",
  }

  
  validar_nombre=true;
  mform=false;
  botones_form=false;


  constructor(private smarca:MarcaService){}

  ngOnInit(): void{
    this.consulta();
   

  }

  consulta(){
    this.smarca.consulta().subscribe((resultado:any)=> {
    this.marca=resultado;
    
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
    this.obj_marca= {
      nombre:""
    }
  }


  // Validacion del formulario
  validar(funcion:any){
    if(this.obj_marca.nombre == ""){
      this.validar_nombre = false;
    }else{
      this.validar_nombre=true;
    }

    if(this.validar_nombre ==true  && funcion=='guardar'){
      this.guardar();
    }
    if(this.validar_nombre ==true  && funcion=='editar'){
      this.editar();
    }
  }

  // Guarda informacion dentro de BD
  guardar(){

    this.smarca.insertar(this.obj_marca).subscribe((datos:any) => {
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
      title: "Estas seguro de eliminar esta marca?",
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
        this.smarca.eliminar(id).subscribe((datos:any) => {
          if(datos['resultado']=='OK'){
            this.consulta();
          }
        })
        // 
        Swal.fire({
          title: "Eliminado!",
          text: "La marca ha sido eliminada.",
          icon: "success"
        });
      }
    });

    
  }

  // Cargar datos para el editar
  cargar_datos(items:any,id:number){

    this.obj_marca= {
      nombre: items.nombre
    }

    this.id_marca=id;

    this.botones_form= true;
    this.mostrar_form('ver');

  }
  // Editar datos
  editar(){
    this.smarca.editar(this.id_marca, this.obj_marca).subscribe((datos:any)=>{
      if(datos['resultado']=="OK"){
        this.consulta();
      }
    });
    this.limpiar();
    this.mostrar_form('No ver');
  }
}

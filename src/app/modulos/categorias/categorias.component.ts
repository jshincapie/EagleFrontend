import { Component } from '@angular/core';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import Swal from  'sweetalert2';


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent {


  
  categorias: any;
  id_categorias: any;

  obj_categoria= {
    nombre:""
  }


  validar_nombre=true;
  mform=false;
  botones_form=false;


  constructor(private scategoria:CategoriaService ){}

  ngOnInit(): void{
    this.consulta();
    

  }

  consulta(){
    this.scategoria.consulta().subscribe((resultado:any)=> {
    this.categorias=resultado;
    
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
    this.obj_categoria= {
      nombre:""
    }
  }


  // Validacion del formulario
  validar(funcion:any){
    if(this.obj_categoria.nombre == ""){
      this.validar_nombre = false;
    }else{
      this.validar_nombre=true;
    }

   

    if(this.validar_nombre ==true  && funcion=='guardar'){
      this.guardar();
    }
    if(this.validar_nombre ==true && funcion=='editar'){
      this.editar();
    }
  }

  // Guarda informacion dentro de BD
  guardar(){

    this.scategoria.insertar(this.obj_categoria).subscribe((datos:any) => {
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
      title: "Estas seguro de eliminar esta categoria?",
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
        this.scategoria.eliminar(id).subscribe((datos:any) => {
          if(datos['resultado']=='OK'){
            this.consulta();
          }
        })
        // 
        Swal.fire({
          title: "Eliminado!",
          text: "La categoria ha sido eliminado.",
          icon: "success"
        });
      }
    });

    
  }

  // Cargar datos para el editar
  cargar_datos(items:any,id:number){

    this.obj_categoria= {
      nombre: items.nombre,

    }

    this.id_categorias=id;

    this.botones_form= true;
    this.mostrar_form('ver');

  }
  // Editar datos
  editar(){
    this.scategoria.editar(this.id_categorias, this.obj_categoria).subscribe((datos:any)=>{
      if(datos['resultado']=="OK"){
        this.consulta();
      }
    });
    this.limpiar();
    this.mostrar_form('No ver');
  }
  
}

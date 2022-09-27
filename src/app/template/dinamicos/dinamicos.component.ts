import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Persona {
  nombre: string;
  favoritos: Favorito[]
}

interface Favorito {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html'
})
export class DinamicosComponent implements OnInit {

  persona: Persona = {
    nombre: 'Fernando',
    favoritos: [
      {id: 1, nombre: 'Metal Gear'},
      {id: 2, nombre: 'DeadStrnding'}
    ]
  }

  nuevoJuego: string= '';

  @ViewChild('miFormulario') miFormulario!: NgForm

  constructor() { }

  ngOnInit(): void {
  }

  guardar(){
    console.log("guardando")
  }

  nombreValido(){
     return this.miFormulario?.controls["nombre"]?.invalid && this.miFormulario?.controls['nombre']?.touched
  }

  agregar(){
    const nuevoFavorito: Favorito = {
      id: this.persona.favoritos.length + 1,
      nombre: this.nuevoJuego
    }

    this.persona.favoritos.push({...nuevoFavorito})
    this.nuevoJuego = '';
  }

  eliminar(index: number){
    this.persona.favoritos.splice(index, 1)
  }
}

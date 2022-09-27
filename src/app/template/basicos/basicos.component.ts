import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html'
})
export class BasicosComponent {

  @ViewChild('miFormulario') miFormulario!: NgForm;

  initForm = {
    producto: 'RTX 4880ti',
    precio: 29,
    existencias: 20
  }

  constructor() { }

  nombreValido(): boolean {
    return this.miFormulario?.controls['producto']?.invalid && this.miFormulario?.controls['producto']?.touched
  }

  precioValido(): boolean {
    return this.miFormulario?.controls['precio']?.value < 0 && this.miFormulario?.controls['precio']?.touched;
  }

  guardar(){
    console.log(this.miFormulario);

    this.miFormulario.reset({
      producto: '',
      precio: 0,
      existencias: 0

    })
  }
}

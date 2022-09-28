import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html'
})
export class DinamicosComponent {

  miFormulario: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    favoritos: this.formBuilder.array([
      ['Metal Gear', Validators.required],
      ['Death Strading', Validators.required]
    ], Validators.required)
  })

  nuevoFavorito: FormControl = this.formBuilder.control('', Validators.required);

  constructor(private formBuilder: FormBuilder) { }

  get favoritosArray(){
    return this.miFormulario.get('favoritos') as FormArray;
  }

  campoEsValido(campo: string){
    return this.miFormulario.controls[campo].invalid && this.miFormulario.controls[campo].touched;
  }

  guardar(){
    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      return ;
    }

    console.log(this.miFormulario.value);
    this.miFormulario.reset()
  }

  agregarFavorito(){
    if(this.nuevoFavorito.invalid){
      return ;
    }
    this.favoritosArray.push(new FormControl(this.nuevoFavorito.value, Validators.required));

    this.nuevoFavorito.reset();
  }

  eliminar(index: number){
    this.favoritosArray.removeAt(index);
    
  }
}

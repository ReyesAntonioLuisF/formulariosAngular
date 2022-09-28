import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html'
})
export class SwitchesComponent implements OnInit {

  miFormulario: FormGroup = this.formBuilder.group({
    genero: ['M', Validators.required],
    notificaciones: [true, Validators.required],
    condiciones: [false, Validators.requiredTrue]
  });

  persona = {
    genero: 'F',
    notificaciones: true
  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.miFormulario.reset({...this.persona, condiciones: false})

    this.miFormulario.valueChanges.subscribe(({ condiciones, ...rest}) => {
      //delete form.condiciones;
      this.persona = rest;
    })
  }

  guardar(){
    const formValue = {...this.miFormulario.value};
    delete formValue.notificaciones

    console.log(formValue)
  }
}

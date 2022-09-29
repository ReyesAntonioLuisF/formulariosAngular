import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/validator/email-validator.service';
import { ValidatorService } from 'src/app/shared/validator/validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',

})
export class RegistroComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(this.validatorService.nombreApellidoPattern)]],
    email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)],[this.emailVali]],
    username: ['', [Validators.required, this.validatorService.noPuedeSerStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    passwordConf: ['', [Validators.required]],
  }, {
    validator: [this.validatorService.camposIguales('password','passwordConf')]
  })

  get emailErrorMsg(): string {
    const errors = this.miFormulario.get('email')?.errors;

    if( errors?.['required'] ){
      return 'Email es obligatorio';
    } else if( errors?.['pattern']){
      return 'El valor ingresado no tiene formato de correo'
    } else if ( errors?.['emailTomado']){
      return 'El email ya fue tomado'
    }

    return '';
  }
  
  constructor(private fb: FormBuilder, private validatorService: ValidatorService, private emailVali: EmailValidatorService) { }

  ngOnInit(): void {

    this.miFormulario.reset({
      nombre: 'Fernando Herrera',
      email: 'test1@test.com',
      username: 'Fernandor',
      password: '123456',
      passwordConf: '123456'
    })
  }

  campoNoValido(campo: string){
    return this.miFormulario.get(campo)?.invalid && this.miFormulario.get(campo)?.touched
  }

  submitFormulario(){
   /* if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched()
      return;
    }]*/
    console.log(this.miFormulario.value)
    this.miFormulario.markAllAsTouched()
  }
}

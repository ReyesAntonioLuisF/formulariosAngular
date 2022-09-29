import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {
  public nombreApellidoPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"

  constructor() { }

  noPuedeSerStrider (argumento: FormControl): ValidationErrors | null{
    const valor = argumento.value?.trim().toLowerCase();
    if(valor === 'strider'){
      return {
        noStrider: true
      }
    }
    return null;
  }

  camposIguales(campo1: string, campo2: string){
    return (formGruop: AbstractControl): ValidationErrors | null => {
      const pwd1 = formGruop.get(campo1)?.value;
      const pwd2 = formGruop.get(campo2)?.value;

      if(pwd1 !== pwd2){
        formGruop.get(campo2)?.setErrors({ noIguales: true})
        return {noIguales: true}
      }

      formGruop.get(campo2)?.setErrors(null)
      return null;
    }
  }
}

import { AbstractControl } from "@angular/forms";

export function equalValues(controlName1: string, controlName2: string) {
    return (control: AbstractControl) => {
      const val1 = control.get(controlName1)?.value;
      const val2 = control.get(controlName2)?.value;
  
      if (val1 === val2) {
        return null;
      }
  
      return { valuesNotEqual: true };
    };
  }
 export function validPass(control: AbstractControl) {
    const regex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}/;
    const pass = control.value;
    if(regex.test(pass)){
      return null;
    }
    return {passwordRegexMismatch:true};
  
  }
import {AbstractControl, ValidatorFn} from '@angular/forms';

export function LengthValidator(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    if (!control.value) {
      return null;
    }

    const value = (control.value || '').trim();
    return value.length < min || value.length > max ? {length: true} : null;
  };
}

export function IntegerValidator(control: AbstractControl): {[key: string]: any} | null {
  return control.value && control.value % 1 !== 0 ? {integer: true} : null;
}

export function AccuracyValidator(accuracy: number): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const value = (control.value || '').toString();
    const expression = /^\d*\.(\d*)$/g;
    const result = expression.exec(value);
    return result && result[1].length > accuracy ? {accuracy: true} : null;
  };
}

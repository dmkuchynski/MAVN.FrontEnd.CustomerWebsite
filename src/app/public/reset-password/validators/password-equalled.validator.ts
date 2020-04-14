// https://angular.io/guide/form-validation#adding-to-template-driven-forms-1
import {ValidationErrors, ValidatorFn, FormGroup} from '@angular/forms';

export const PasswordEqualledValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('Password');
  const reenterPassword = control.get('ReenterPassword');

  const error = password && reenterPassword && password.value !== reenterPassword.value ? {passwordNotEqualled: true} : null;

  return error;
};

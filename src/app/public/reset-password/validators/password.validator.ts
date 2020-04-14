import {ValidatorFn, AbstractControl} from '@angular/forms';
import {PasswordValidationRules} from '../interface/password-validation-rules.interface';

export function PasswordValidator(rules: PasswordValidationRules): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const value: string = (control.value || '').toString();
    let isValid = value ? true : false;
    const valueChars = value.split('');

    if (isValid) {
      isValid = hasEnoughLowerCaseLetter();
    }

    if (isValid) {
      isValid = hasEnoughUpperCaseLetter();
    }

    if (isValid) {
      isValid = hasEnoughDigits();
    }

    if (isValid) {
      isValid = hasEnoughSpecialSymbols();
    }

    if (isValid) {
      isValid = noWhiteSpaceIfNotAllowed();
    }

    return isValid ? null : {invalidPasswordFormat: true};

    function hasEnoughLowerCaseLetter() {
      const charsCount = valueChars.reduce((count, char) => {
        if (isNaN((char as any) * 1) && char === char.toLowerCase() && char !== char.toUpperCase()) {
          count++;
        }

        return count;
      }, 0);

      return charsCount >= rules.MinLowerCase;
    }

    function hasEnoughUpperCaseLetter() {
      const charsCount = valueChars.reduce((count, char) => {
        if (isNaN((char as any) * 1) && char === char.toUpperCase() && char !== char.toLowerCase()) {
          count++;
        }

        return count;
      }, 0);

      return charsCount >= rules.MinUpperCase;
    }

    function hasEnoughDigits() {
      const charsCount = valueChars.reduce((count, char) => {
        if (!isNaN((char as any) * 1)) {
          count++;
        }

        return count;
      }, 0);

      return charsCount >= rules.MinNumbers;
    }

    function hasEnoughSpecialSymbols() {
      const charsCount = valueChars.reduce((count, char) => {
        if (rules.AllowedSpecialSymbols.indexOf(char) > -1) {
          count++;
        }

        return count;
      }, 0);

      return charsCount >= rules.MinSpecialSymbols;
    }

    function noWhiteSpaceIfNotAllowed() {
      const hasWhiteSpace = valueChars.some(char => {
        return char === ' ';
      });

      if (!rules.AllowWhiteSpaces && hasWhiteSpace) {
        return false;
      }

      return true;
    }
  };
}

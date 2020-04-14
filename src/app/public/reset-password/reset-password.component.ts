import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PublicService} from '../public.service';
import {ResetPasswordRequest} from './interface/reset-password-request.interface';
import {ValidateResetPasswordIdentifierRequest} from './interface/validate-reset-password-identifier-request.interface';
import {PasswordValidationRules} from './interface/password-validation-rules.interface';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {PasswordEqualledValidator} from './validators/password-equalled.validator';
import {LengthValidator} from 'src/app/shared/utils/validators';
import {PasswordValidator} from './validators/password.validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordPageComponent implements OnInit {
  isCheckingResetIdentifier: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  hasParamsError: boolean;
  hasResetIdentifierError: boolean;
  resetIdentifierErrorCode: string;
  hasSubmitError: boolean;
  errorCode: string;
  rules: PasswordValidationRules = {} as PasswordValidationRules;
  isVisiblePassword: boolean;
  isVisibleReenterPassword: boolean;
  customerEmail: string;
  resetIdentifier: string;
  rpForm: FormGroup;

  constructor(private route: ActivatedRoute, private publicService: PublicService, private fb: FormBuilder) {
    this.rpForm = this.fb.group(
      {
        Password: [null, [Validators.required]],
        ReenterPassword: [null, [Validators.required]]
      },
      {
        validator: [PasswordEqualledValidator]
      }
    );
  }

  ngOnInit() {
    this.customerEmail = this.route.snapshot.queryParams.email;
    this.resetIdentifier = this.route.snapshot.queryParams.resetIdentifier;

    if (!this.customerEmail || !this.resetIdentifier) {
      this.hasParamsError = true;
      return;
    }

    const model: ValidateResetPasswordIdentifierRequest = {
      ResetPasswordIdentifier: this.resetIdentifier
    };

    this.isCheckingResetIdentifier = true;

    this.publicService.validateResetPasswordIdentifier(model).subscribe(
      () => {
        this.getPasswordRequirements();
      },
      ({error}) => {
        console.error(error);

        if (error.error) {
          this.resetIdentifierErrorCode = error.error;
        }

        this.hasResetIdentifierError = true;
        this.isCheckingResetIdentifier = false;
      }
    );
  }

  getPasswordRequirements() {
    this.publicService.getPasswordValidationRules().subscribe(
      (rules: PasswordValidationRules) => {
        this.isCheckingResetIdentifier = false;

        this.rules = rules;

        const passwordControl = this.rpForm.get('Password');

        passwordControl.setValidators([Validators.required, LengthValidator(rules.MinLength, rules.MaxLength), PasswordValidator(rules)]);
        passwordControl.updateValueAndValidity();
      },
      ({error}) => {
        console.error(error);

        this.hasResetIdentifierError = true;
        this.isCheckingResetIdentifier = false;
      }
    );
  }

  onSubmit(): void {
    this.isLoading = true;

    const model: ResetPasswordRequest = {
      CustomerEmail: this.customerEmail,
      ResetIdentifier: this.resetIdentifier,
      Password: this.rpForm.get('Password').value
    };

    this.hasSubmitError = false;
    this.errorCode = '';

    this.publicService.resetPassword(model).subscribe(
      () => {
        this.isSuccess = true;
        this.isLoading = false;
      },
      ({error}) => {
        console.error(error);

        if (error.error) {
          this.errorCode = error.error;
        }

        this.hasSubmitError = true;
        this.isLoading = false;
      }
    );
  }

  onToggleVisibilityPassword(): void {
    this.isVisiblePassword = !this.isVisiblePassword;
  }

  onToggleVisibilityReenterPassword(): void {
    this.isVisibleReenterPassword = !this.isVisibleReenterPassword;
  }
}

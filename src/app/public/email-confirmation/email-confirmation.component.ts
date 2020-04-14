import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PublicService} from '../public.service';
import {EmailConfirmationRequest} from './interface/email-confirmation-request.interface';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss']
})
export class EmailConfirmationPageComponent implements OnInit {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorCode: string;
  verificationCode: string;

  constructor(private route: ActivatedRoute, private publicService: PublicService) {}

  ngOnInit() {
    this.verificationCode = this.route.snapshot.queryParams.code;

    if (!this.verificationCode) {
      this.isError = true;
      this.isLoading = false;
      return;
    }

    const model: EmailConfirmationRequest = {
      verificationCode: this.verificationCode
    };

    this.isLoading = true;

    this.publicService.verifyEmail(model).subscribe(
      () => {
        this.isSuccess = true;
        this.isLoading = false;
      },
      ({error}) => {
        console.error(error);

        if (error.error) {
          this.errorCode = error.error;
        }

        this.isError = true;
        this.isLoading = false;
      }
    );
  }
}

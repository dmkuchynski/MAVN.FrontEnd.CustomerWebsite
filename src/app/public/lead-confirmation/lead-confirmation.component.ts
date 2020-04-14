import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PublicService} from '../public.service';
import {LeadConfirmationRequest} from './interface/lead-confirmation-request.interface';

@Component({
  selector: 'app-lead-confirmation',
  templateUrl: './lead-confirmation.component.html',
  styleUrls: ['./lead-confirmation.component.scss']
})
export class LeadConfirmationPageComponent implements OnInit {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorCode: string;
  confirmationCode: string;

  constructor(private route: ActivatedRoute, private publicService: PublicService) {}

  ngOnInit() {
    this.confirmationCode = this.route.snapshot.queryParams.code;

    if (!this.confirmationCode) {
      this.isError = true;
      this.isLoading = false;
      return;
    }

    const model: LeadConfirmationRequest = {
      ConfirmationCode: this.confirmationCode
    };

    this.isLoading = true;

    this.publicService.confirmLead(model).subscribe(
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

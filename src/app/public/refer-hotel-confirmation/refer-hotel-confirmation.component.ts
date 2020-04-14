import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PublicService} from '../public.service';
import {ReferHotelConfirmationRequest} from './interface/refer-hotel-confirmation-request.interface';
import {ReferHotelConfirmationResponse} from './interface/refer-hotel-confirmation-response.interface';
import {SettingsService} from 'src/app/core/settings/settings.service';
import {TOKEN_SYMBOL} from 'src/app/core/constants/const';

@Component({
  selector: 'app-refer-hotel-confirmation',
  templateUrl: './refer-hotel-confirmation.component.html',
  styleUrls: ['./refer-hotel-confirmation.component.scss']
})
export class ReferHotelConfirmationPageComponent implements OnInit {
  TOKEN_SYMBOL = TOKEN_SYMBOL;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorCode: string;
  androidLink: string;
  iosLink: string;
  confirmationCode: string;
  ReferrerEmail: string;

  constructor(
    // dependencies
    private publicService: PublicService,
    private route: ActivatedRoute,
    private settingsService: SettingsService
  ) {
    this.androidLink = this.settingsService.androidLink;
    this.iosLink = this.settingsService.iosLink;
  }

  ngOnInit() {
    this.confirmationCode = this.route.snapshot.queryParams.code;

    if (!this.confirmationCode) {
      this.isError = true;
      this.isLoading = false;
      return;
    }

    const model: ReferHotelConfirmationRequest = {
      ConfirmationCode: this.confirmationCode
    };

    this.isLoading = true;

    this.publicService.confirmReferHotel(model).subscribe(
      (res: ReferHotelConfirmationResponse) => {
        this.ReferrerEmail = res.Email;
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

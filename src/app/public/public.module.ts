import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PublicRoutingModule} from './public-routing.module';
import {SharedModule} from '../shared/shared.module';
// Components
import {EmailConfirmationPageComponent} from './email-confirmation/email-confirmation.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {ResetPasswordPageComponent} from './reset-password/reset-password.component';
import {LeadConfirmationPageComponent} from './lead-confirmation/lead-confirmation.component';
import {ReferHotelConfirmationPageComponent} from './refer-hotel-confirmation/refer-hotel-confirmation.component';

@NgModule({
  declarations: [
    // Components
    EmailConfirmationPageComponent,
    NotFoundComponent,
    ResetPasswordPageComponent,
    LeadConfirmationPageComponent,
    ReferHotelConfirmationPageComponent
  ],
  imports: [
    // modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PublicRoutingModule,
    SharedModule
  ]
})
export class PublicModule {}

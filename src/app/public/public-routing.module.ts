import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PublicLayoutComponent} from './public-layout/public-layout/public-layout.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {PublicLayoutModule} from './public-layout/public-layout.module';
import {EmailConfirmationPageComponent} from './email-confirmation/email-confirmation.component';
import {ResetPasswordPageComponent} from './reset-password/reset-password.component';
import {LeadConfirmationPageComponent} from './lead-confirmation/lead-confirmation.component';
import {ReferHotelConfirmationPageComponent} from './refer-hotel-confirmation/refer-hotel-confirmation.component';

const routes: Routes = [
  {
    path: 'dapp-linking',
    loadChildren: './dapp/dapp.module#DappModule'
  },
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: 'email-confirmation',
        component: EmailConfirmationPageComponent
      },
      {
        path: 'refer-hotel',
        component: ReferHotelConfirmationPageComponent
      },
      {
        path: 'lead-confirmation',
        component: LeadConfirmationPageComponent
      },
      {
        path: 'reset-password',
        component: ResetPasswordPageComponent
      },
      // {
      //  OTHER PAGES GO HERE
      // }
      {path: '**', component: NotFoundComponent}
    ]
  }
];

@NgModule({
  imports: [PublicLayoutModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule {}

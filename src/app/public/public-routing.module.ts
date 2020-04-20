import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PublicLayoutComponent} from './public-layout/public-layout/public-layout.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {PublicLayoutModule} from './public-layout/public-layout.module';
import {EmailConfirmationPageComponent} from './email-confirmation/email-confirmation.component';
import {ResetPasswordPageComponent} from './reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: 'email-confirmation',
        component: EmailConfirmationPageComponent
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

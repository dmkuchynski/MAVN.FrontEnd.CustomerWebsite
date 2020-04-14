import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SharedModule} from 'src/app/shared/shared.module';
import {DappRoutingModule} from './dapp-routing.module';
import {DappLinkingPageComponent} from './dapp-linking-page/dapp-linking-page.component';

@NgModule({
  declarations: [
    // components
    DappLinkingPageComponent
  ],
  imports: [
    // modules
    CommonModule,
    DappRoutingModule,
    FormsModule,
    SharedModule
  ],
  providers: [
    // services
  ]
})
export class DappModule {}

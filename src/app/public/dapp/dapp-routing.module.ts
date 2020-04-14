import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DappLinkingPageComponent} from './dapp-linking-page/dapp-linking-page.component';

const routes: Routes = [
  {
    path: '',
    component: DappLinkingPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DappRoutingModule {}

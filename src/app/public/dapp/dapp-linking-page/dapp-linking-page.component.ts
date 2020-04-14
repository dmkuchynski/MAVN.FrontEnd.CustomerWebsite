import {Component, OnInit, Inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import Web3 from 'web3';
import {WEB3} from '../services/web3';
import {LinkRequest} from '../models/link-request.interface';
import {DappService} from '../services/dapp.service';
import {TOKEN_SYMBOL} from 'src/app/core/constants/const';

@Component({
  selector: 'app-dapp-linking-page',
  templateUrl: './dapp-linking-page.component.html',
  styleUrls: ['./dapp-linking-page.component.scss']
})
export class DappLinkingPageComponent implements OnInit {
  TOKEN_SYMBOL = TOKEN_SYMBOL;
  linkCode: string;
  internalAddress: string;
  publicAddress: string;
  signature: string;
  isNotDappBrowser = false;
  isInitializing = true;
  isLinking = false;
  isSent = false;
  hasParamsError = false;
  hasSubmitError = false;
  errorCode: string;

  constructor(
    // services
    private dappService: DappService,
    private route: ActivatedRoute,
    @Inject(WEB3) private web3: Web3
  ) {}

  async ngOnInit() {
    if (this.web3 && this.web3.currentProvider) {
      this.linkCode = this.route.snapshot.queryParams['link-code'];
      this.internalAddress = this.route.snapshot.queryParams['internal-address'];

      if (!this.internalAddress) {
        this.hasParamsError = true;
        this.isInitializing = false;
        return;
      }

      if ('enable' in this.web3.currentProvider) {
        await (this.web3.currentProvider as any).enable();
      }

      const accounts = await this.web3.eth.getAccounts();
      this.publicAddress = accounts[0];
    } else {
      this.isNotDappBrowser = true;
    }

    this.isInitializing = false;
  }

  async link() {
    this.isLinking = true;
    // https://web3js.readthedocs.io/en/v1.2.1/web3-eth.html#sign
    try {
      this.signature = await (this.web3.eth.personal as any).sign(this.linkCode, this.publicAddress);
      this.send();
    } catch (error) {
      // this occurs when user cancelled signing
      this.isLinking = false;
      console.error(error);
    }
  }

  private send(): void {
    const model: LinkRequest = {
      PrivateAddress: this.internalAddress,
      PublicAddress: this.publicAddress,
      Signature: this.signature
    };

    this.dappService.linkRequest(model).subscribe(
      () => {
        this.isLinking = false;
        this.isSent = true;
      },
      ({error}) => {
        console.error(error);

        if (error.error) {
          this.errorCode = error.error;
        }

        this.hasSubmitError = true;
        this.isLinking = false;
      }
    );
  }
}

import {Component, OnInit} from '@angular/core';
import {PublicService} from '../../public.service';
import {FooterInfo} from './models/footer-info.interface';
import {TOKEN_SYMBOL} from 'src/app/core/constants/const';

@Component({
  selector: 'app-public-footer',
  templateUrl: './public-footer.component.html',
  styleUrls: ['./public-footer.component.scss']
})
export class PublicFooterComponent implements OnInit {
  TOKEN_SYMBOL = TOKEN_SYMBOL;
  isLoadingFooter = true;
  footerInfo: FooterInfo = {} as FooterInfo;

  constructor(private publicService: PublicService) {}

  ngOnInit() {
    this.publicService.getFooterLinks().subscribe(
      (response: FooterInfo) => {
        this.footerInfo = response;
        this.isLoadingFooter = false;
      },
      ({error}) => {
        console.error(error);
        this.isLoadingFooter = false;
      }
    );
  }
}

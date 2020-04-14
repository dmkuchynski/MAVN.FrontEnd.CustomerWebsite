import {Component, OnInit, HostBinding, Inject, LOCALE_ID, AfterViewInit} from '@angular/core';
import {Router, NavigationStart, NavigationEnd, NavigationCancel} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  @HostBinding('attr.dir') dir = 'ltr';
  isLoading = true;

  constructor(
    // dependencies
    @Inject(LOCALE_ID) private locale: string,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.locale);

    if (this.locale.startsWith('ar')) {
      this.dir = 'rtl';
    }
  }

  ngAfterViewInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isLoading = true;
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
        this.isLoading = false;
      }
    });
  }
}

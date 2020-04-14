import {APP_INITIALIZER, Injectable, Provider} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {shareReplay, tap} from 'rxjs/operators';
import {Settings} from './settings';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  static appInitializerProviders: Provider[] = [
    SettingsService,
    {
      provide: APP_INITIALIZER,
      useFactory: SettingsService.loadSettingsFactoryProvider,
      deps: [SettingsService],
      multi: true
    }
  ];

  get apiUrl() {
    return this._settings && this._settings.CustomerWebsite.CustomerApiUrl;
  }

  get androidLink() {
    return this._settings && this._settings.CustomerWebsite.AndroidLink;
  }

  get iosLink() {
    return this._settings && this._settings.CustomerWebsite.IosLink;
  }

  private _settings: Readonly<Settings>;

  readonly baseSettings$ = this.getSettings().pipe(
    tap(settings => {
      this._settings = Object.freeze(settings);
    }),
    shareReplay(1)
  );

  static loadSettingsFactoryProvider(settings: SettingsService) {
    return () => settings.baseSettings$.toPromise().catch(() => true);
  }

  static baseUrlFactory(settings: SettingsService) {
    return settings.apiUrl;
  }

  constructor(private http: HttpClient) {}

  getSettings() {
    let path = 'nginx/env-config.json';

    if (environment.production) {
      path = '/env-config.json';
    }

    return this.http.get<Settings>(path);
  }
}

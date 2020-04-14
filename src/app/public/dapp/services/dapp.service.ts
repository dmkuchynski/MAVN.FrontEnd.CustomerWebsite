import {Injectable} from '@angular/core';
import {ApiHttpService} from 'ngx-api-utils';
import {LinkRequest} from '../models/link-request.interface';

@Injectable({
  providedIn: 'root'
})
export class DappService {
  constructor(private apiHttp: ApiHttpService) {}

  linkRequest(model: LinkRequest) {
    return this.apiHttp.put('/api/wallets/linkRequest', model, {headers: this.apiHttp.headersWithNoAuthorization()});
  }
}

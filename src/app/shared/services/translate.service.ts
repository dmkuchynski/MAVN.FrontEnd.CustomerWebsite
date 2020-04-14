import {Injectable} from '@angular/core';
import {GlobalTranslate} from '../models/global-translate.interface';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  globalTranslates: GlobalTranslate;

  get translates() {
    return this.globalTranslates;
  }

  constructor() {
    this.globalTranslates = new GlobalTranslate();
  }
}

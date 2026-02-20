import { inject, Injectable } from '@angular/core';
import{ TranslateService } from '@ngx-translate/core'
import { CheckplateformService } from '../../../shared/services/checkplateform/checkplateform.service';

@Injectable({
  providedIn: 'root',
})
export class MyTranslateService {
  _CheckplateformService:CheckplateformService=inject(CheckplateformService);
  constructor(){
    if(this._CheckplateformService.checkPlateFormBrowser()){
      let defaultLang:string='en';
   if(localStorage.getItem('lang')!=null){
    defaultLang=localStorage.getItem('lang')!;
   };
   this._TranslateService.setFallbackLang(defaultLang);

   this._TranslateService.use(defaultLang);

   this.changeDirection(defaultLang);
    };
   
  }
_TranslateService:TranslateService=inject(TranslateService);
  changeLang(lang:string){
    localStorage.setItem('lang',lang);
    this._TranslateService.setFallbackLang(lang);

    this._TranslateService.use(lang);

    this.changeDirection(lang);
  };


  changeDirection(lang:string){
    document.dir= lang==='ar'?'rtl':'ltr';
   
  };
  
}

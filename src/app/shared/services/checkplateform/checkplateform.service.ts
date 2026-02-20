import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CheckplateformService {
  constructor(@Inject(PLATFORM_ID) private ID:object){}
  checkPlateFormBrowser(){
    if(isPlatformBrowser(this.ID)){
      return true;
    }
    return false;
  }
}

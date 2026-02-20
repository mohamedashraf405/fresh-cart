import { HttpInterceptorFn } from '@angular/common/http';
import { CheckplateformService } from '../../../shared/services/checkplateform/checkplateform.service';
import { inject } from '@angular/core';

export const setheaderInterceptor: HttpInterceptorFn = (req, next) => {
  const _CheckplateformService:CheckplateformService=inject(CheckplateformService);
  if(req.url.includes('orders')||req.url.includes('wishlist')||req.url.includes('cart')){

     if(_CheckplateformService.checkPlateFormBrowser()){
      req=req.clone({
      headers:req.headers.set('token',localStorage.getItem('userToken')!)
  })
  }
  }
 
 
  return next(req);
};

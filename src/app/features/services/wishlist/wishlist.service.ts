import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { enviroment } from '../../../../enviroment/enviroment';
import { Observable } from 'rxjs';
import { WishlistResponse } from '../../../shared/models/Iwishlist';
import { CheckplateformService } from '../../../shared/services/checkplateform/checkplateform.service';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  _HttpClient:HttpClient=inject(HttpClient);
  _CheckplateformService:CheckplateformService=inject(CheckplateformService);
  NumOfWishlistItems:WritableSignal<number>=signal<number>(0);

   constructor(){
    if(this._CheckplateformService.checkPlateFormBrowser()){
 this.getLoggedUserWishlist().subscribe((res)=>{
      this.NumOfWishlistItems.set(res.count)
    })
    
    }
   
  }

  addProductToWishlist(productId:string):Observable<any>{
    return this._HttpClient.post(`${enviroment.baseUrl}/api/v1/wishlist`,{
      productId:productId
    })
  }
  getLoggedUserWishlist():Observable<WishlistResponse>{
   return this._HttpClient.get<WishlistResponse>(`${enviroment.baseUrl}/api/v1/wishlist`)
  }
  
  removeProductFromWishlist(productId:string):Observable<any>{
   return this._HttpClient.delete(`${enviroment.baseUrl}/api/v1/wishlist/${productId}`)
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enviroment } from '../../../../enviroment/enviroment';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartResponse } from '../../../shared/models/Icart';
import { CheckplateformService } from '../../../shared/services/checkplateform/checkplateform.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  NumOfCartItems:BehaviorSubject<number>=new BehaviorSubject<number>(0)
  private _HttpClient:HttpClient= inject(HttpClient);
  private _CheckplateformService:CheckplateformService = inject(CheckplateformService)
  constructor(){
    if(this._CheckplateformService.checkPlateFormBrowser()){
 this.getLoggedUserCart().subscribe((res)=>{
      this.NumOfCartItems.next(res.numOfCartItems)
      

      
    })
    }
   
  }

  addProductToCart(productId:string):Observable<any>
  {
   return this._HttpClient.post(`${enviroment.baseUrl}/api/v1/cart`,{
      productId:productId
    })
  }

  getLoggedUserCart():Observable<CartResponse>{
    return this._HttpClient.get<CartResponse>(`${enviroment.baseUrl}/api/v1/cart`)
  }

  updateProductCount(productId:string,count:string):Observable<CartResponse>{
   return this._HttpClient.put<CartResponse>(`${enviroment.baseUrl}/api/v1/cart/${productId}`,{
    count:count
   })
  }

  RemoveSpecificItem(productId:string):Observable<CartResponse>{
    return this._HttpClient.delete<CartResponse>(`${enviroment.baseUrl}/api/v1/cart/${productId}`)
  }
  clearUserCart():Observable<any>{
    return this._HttpClient.delete(`${enviroment.baseUrl}/api/v1/cart`)
  }


}

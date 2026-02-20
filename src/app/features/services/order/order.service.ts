import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enviroment } from '../../../../enviroment/enviroment';
import { shippingAddressData } from '../../../shared/models/data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  _HttpClient:HttpClient=inject(HttpClient);
  
  createCashOrder(cartId:string,data:shippingAddressData):Observable<any>{
   return this._HttpClient.post(`${enviroment.baseUrl}/api/v1/orders/${cartId}`,{
      shippingAddress :data
    }
  )
  }
 
  checkOut(cartId:string,data:shippingAddressData):Observable<any>{
    return this._HttpClient.post(`${enviroment.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=${enviroment.domain}`,{
      shippingAddress :data
    })
  }
  getAllOrders(userId:string):Observable<any>{
    return this._HttpClient.get(`${enviroment.baseUrl}/api/v1/orders/user/${userId}`)
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enviroment } from '../../../../enviroment/enviroment';
import { Observable } from 'rxjs';
import { AllProductsResponse, Product } from '../../../shared/models/Iproduct';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
 private _HttpClient:HttpClient=inject(HttpClient);
  getAllProducts():Observable<AllProductsResponse>
  {
    return this._HttpClient.get<AllProductsResponse>(`${enviroment.baseUrl}/api/v1/products?limit=24`);
  }
  getProductsPage(page:string,sort:string):Observable<AllProductsResponse>
  {
    return this._HttpClient.get<AllProductsResponse>(`${enviroment.baseUrl}/api/v1/products?limit=24&page=${page}&sort=${sort}`);
  }

  getSpecificProduct(productId:string):Observable<{data:Product}>{
    return this._HttpClient.get<{data:Product}>(`${enviroment.baseUrl}/api/v1/products/${productId}`)
  }
}

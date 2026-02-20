import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enviroment } from '../../../../enviroment/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private _HttpClient:HttpClient=inject(HttpClient);

  getAllCategores():Observable<any>{
    return this._HttpClient.get(`${enviroment.baseUrl}/api/v1/categories`)
  }
  getSupCategory(categoryId:string):Observable<any>{
    return this._HttpClient.get(`${enviroment.baseUrl}/api/v1/categories/${categoryId}`)
  }
  getCategoryProducts(categoryId:string):Observable<any>{
    return this._HttpClient.get(`${enviroment.baseUrl}/api/v1/products?category[in]=${categoryId}`)
  }
}

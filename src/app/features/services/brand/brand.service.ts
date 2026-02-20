import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enviroment } from '../../../../enviroment/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private _HttpClient:HttpClient =inject(HttpClient);


  getAllBrand():Observable<any>{
    return this._HttpClient.get(`${enviroment.baseUrl}/api/v1/brands`)
  }

  getSupBrand(brandId:string):Observable<any>{
    return this._HttpClient.get(`${enviroment.baseUrl}/api/v1/brands/${brandId}`)
  }
  getBrandProduct(brandId:string):Observable<any>{
    return this._HttpClient.get(`${enviroment.baseUrl}/api/v1/products?brand=${brandId}`)
  }


}

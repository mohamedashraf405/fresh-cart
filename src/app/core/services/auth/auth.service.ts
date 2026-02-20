import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { forgetPasswordData, logInData, resetCodeData, resetNewPasswordData, singUpData, userToken } from '../../../shared/models/data';
import {  Observable } from 'rxjs';
import { enviroment } from '../../../../enviroment/enviroment';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  userData: WritableSignal<userToken | null> = signal<userToken | null>(null);
  constructor(private _httpClient: HttpClient,@Inject(PLATFORM_ID)ID:object) {
    if (isPlatformBrowser(ID)) {
      if (localStorage.getItem('userToken') != null) {
        this.decodeUserData();
      }
    }
  }
  _Router:Router=inject(Router);
  singUp(data: singUpData): Observable<any> {
    return this._httpClient.post(`${enviroment.baseUrl}/api/v1/auth/signup`, data);
  }

  logIn(data: logInData): Observable<any> {
    return this._httpClient.post(`${enviroment.baseUrl}/api/v1/auth/signin`, data);
  }
  decodeUserData() {
    const token = localStorage.getItem('userToken')!;
    const decoded = jwtDecode<userToken>(token);

    this.userData.set(decoded);
    
    
   
  }

  logOut(){
    localStorage.removeItem('userToken');
    this.userData.set(null);
    this._Router.navigate(['login'])
    
  }
  forgetPassword(data:forgetPasswordData):Observable<any>
  {
    return this._httpClient.post(`${enviroment.baseUrl}/api/v1/auth/forgotPasswords`,data)
  }
  verifyResetCode(data:resetCodeData):Observable<any>
  {
    return this._httpClient.post(`${enviroment.baseUrl}/api/v1/auth/verifyResetCode`,data)
  }
  resetNewPassword(data:resetNewPasswordData):Observable<any>
  {
    return this._httpClient.put(`${enviroment.baseUrl}/api/v1/auth/resetPassword`,data)
  }
}

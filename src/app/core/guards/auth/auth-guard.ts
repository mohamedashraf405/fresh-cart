import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const _AuthService:AuthService =inject(AuthService);
  const _Router: Router=inject(Router);
  if(_AuthService.userData()!=null){
    return true;
  }
  
  return _Router.createUrlTree(['login']);
};

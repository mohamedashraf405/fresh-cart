import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { email } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-resetnewpassword',
  imports: [ReactiveFormsModule,TranslatePipe],
  templateUrl: './resetnewpassword.component.html',
  styleUrl: './resetnewpassword.component.scss',
})
export class ResetnewpasswordComponent {
  private _AuthService:AuthService=inject(AuthService);
  private _Router:Router=inject(Router);
  isLoading:WritableSignal<boolean>=signal<boolean>(false);
  errMsg:WritableSignal<string>=signal<string>('');
  resetNewpasswordForm:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    newPassword:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-zA-Z 0-9]{7,20}$/)])
  })
  submitResetNewpasswordForm(){
    if(this.resetNewpasswordForm.valid){
      this.isLoading.set(true);
      this._AuthService.resetNewPassword(this.resetNewpasswordForm.value).subscribe({
        next:res=>{
         
           this.isLoading.set(false);
           localStorage.setItem('userToken',res.token);
           this._AuthService.decodeUserData()
           this._Router.navigate(['home']);
        },
        error:err=>{
          this.errMsg.set(err.error.message)
         
          this.isLoading.set(false);
        }
      })
      
    }
    
  }
}

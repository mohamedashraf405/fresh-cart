import { Component, inject, signal, WritableSignal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,TranslatePipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private _AuthService:AuthService=inject(AuthService);
  private _Router:Router=inject(Router);
  errMsg:WritableSignal<string>=signal<string>('');
  isLoading:WritableSignal<boolean>=signal<boolean>(false);
  registerForm:FormGroup = new FormGroup ({
    name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-zA-Z 0-9]{7,20}$/)]),
    rePassword:new FormControl(null,[Validators.required]),
    phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)])
  },this.passwordMatchValidator);

  submitRegisterForm(){
    if(this.registerForm.valid){
      this.isLoading.set(true);
      this._AuthService.singUp(this.registerForm.value).subscribe({
        next:res=>{
          console.log(res);
          this.errMsg.set('')
          this.isLoading.set(false);
          localStorage.setItem('userToken',res.token);
          this._Router.navigate(['home']);
          this._AuthService.decodeUserData()
             
        },
        error:err=>{
          this.errMsg.set(err.error.message)
          console.log(this.errMsg());
          this.isLoading.set(false);
          
        }
      })
    }
    
  }
  passwordMatchValidator(x:AbstractControl){
    if(x.get('password')?.value===x.get('rePassword')?.value){
      return null;
    }else{
      x.get('rePassword')?.setErrors({mismatch:true});
      return{mismatch:true}
    }
  }

}

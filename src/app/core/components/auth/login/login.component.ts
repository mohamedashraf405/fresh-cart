import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormGroup, FormControl, Validators,  ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule ,RouterLink,TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private _AuthService:AuthService=inject(AuthService);
  private _Router:Router=inject(Router)
  errMsg:WritableSignal<string>=signal<string>('')
  isLoading:WritableSignal<boolean>=signal<boolean>(false)
  logInForm:FormGroup = new FormGroup ({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-zA-Z 0-9]{7,20}$/)])
  })

  submitLogInForm(){
    if(this.logInForm.valid){
      this.isLoading.set(true);
      this._AuthService.logIn(this.logInForm.value).subscribe({
        next:res=>{
        
          this.errMsg.set('')
          this.isLoading.set(false);
          localStorage.setItem('userToken',res.token);
          this._Router.navigate(['home']);
          this._AuthService.decodeUserData()
             
        },
        error:err=>{
          this.errMsg.set(err.error.message)
          
          this.isLoading.set(false);
          
        }
      })
    }
    
  }
 

}

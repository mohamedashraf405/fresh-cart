import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { ResetcodeComponent } from '../resetcode/resetcode.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-forgetpassword',
  imports: [ReactiveFormsModule,ResetcodeComponent,TranslatePipe],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss',
})
export class ForgetpasswordComponent {
  private _AuthService:AuthService=inject(AuthService)
  isLoading:WritableSignal<boolean>=signal<boolean>(false);
  errMsg:WritableSignal<string>=signal<string>('');
  forgetPasswordFlag:boolean=true;
  resetCodeFlag:boolean=false;
  forgetPasswordForm:FormGroup=new FormGroup({
    email :new FormControl(null,[Validators.required,Validators.email])
  })
  submitForgetPasswordForm(){
    if(this.forgetPasswordForm.valid){
      this.isLoading.set(true);
      this._AuthService.forgetPassword(this.forgetPasswordForm.value).subscribe({
        next:res=>{
          this.forgetPasswordFlag=false;
          this.resetCodeFlag=true;
           this.isLoading.set(false);
        },
        error:err=>{
          this.errMsg.set(err.error.message)
          console.log(this.errMsg());
          this.isLoading.set(false);
        }
      })
      
    }
    
  }

}

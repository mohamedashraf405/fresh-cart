import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { ResetnewpasswordComponent } from '../resetnewpassword/resetnewpassword.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-resetcode',
  imports: [ReactiveFormsModule,ResetnewpasswordComponent,TranslatePipe],
  templateUrl: './resetcode.component.html',
  styleUrl: './resetcode.component.scss',
})
export class ResetcodeComponent {
  private _AuthService:AuthService=inject(AuthService)
  isLoading:WritableSignal<boolean>=signal<boolean>(false);
  errMsg:WritableSignal<string>=signal<string>('');
  resetNewPasswordFlag:boolean=false;
  resetCodeFlag:boolean=true;
  resetCodeForm:FormGroup=new FormGroup({
    resetCode :new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]{4,}$/)])
  })
  submitResetCodeForm(){
    if(this.resetCodeForm.valid){
      this.isLoading.set(true);
      this._AuthService.verifyResetCode(this.resetCodeForm.value).subscribe({
        next:res=>{
          this.resetNewPasswordFlag=true;
          this.resetCodeFlag=false;
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

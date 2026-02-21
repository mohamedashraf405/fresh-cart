import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderService } from '../../services/order/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-shippingaddress',
  imports: [ReactiveFormsModule,TranslatePipe],
  templateUrl: './shippingaddress.component.html',
  styleUrl: './shippingaddress.component.scss',
})
export class ShippingaddressComponent {
  fb:FormBuilder=inject(FormBuilder);
  _OrderService:OrderService=inject(OrderService);
  _ActivatedRoute:ActivatedRoute=inject(ActivatedRoute);
  _Router:Router=inject(Router);
  shippingAddressForm:FormGroup=this.fb.group({
    details:[null,Validators.required],
    phone:[null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
    city:[null,Validators.required],
  })

  submitShippingAddressFormCash(){
    if(this.shippingAddressForm.valid){
      this._ActivatedRoute.params.subscribe({
        next:data=>{
        this._OrderService.createCashOrder(data['id'],this.shippingAddressForm.value).subscribe({
        next:res=>{
          this._Router.navigate(['allorders'])
          
        }
      })
        }
      })


     
    }
    
    
  }


  submitShippingAddressFormOnlin(){
    if(this.shippingAddressForm.valid){
      this._ActivatedRoute.params.subscribe({
        next:data=>{
          this._OrderService.checkOut(data['id'],this.shippingAddressForm.value).subscribe({
            next:res=>{
              window.open(res.session.url,'_self')
              
            }
          })
        }
      })
    }
  }
  

}

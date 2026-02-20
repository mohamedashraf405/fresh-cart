import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { CartData} from '../../../shared/models/Icart';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';



@Component({
  selector: 'app-cart',
  imports: [RouterLink,TranslatePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  _CartService:CartService = inject(CartService);
  CartData:WritableSignal<CartData>=signal<CartData>({} as CartData);
  
  ngOnInit(): void {
    this.getLoggedUserCart()
  }

  getLoggedUserCart(){
    this._CartService.getLoggedUserCart().subscribe((res)=>{
      this.CartData.set(res.data)
     
      
    })
  }
  updateProductCartCount(productId:string,count:number){
    this._CartService.updateProductCount(productId,count.toString()).subscribe((res)=>{
      this.CartData.set(res.data)
     
      this._CartService.NumOfCartItems.next(res.numOfCartItems);
      
    })
  }

  RemoveSpecificItem(productId:string){
    this._CartService.RemoveSpecificItem(productId).subscribe((res)=>{
      this.CartData.set(res.data)
    
      this._CartService.NumOfCartItems.next(res.numOfCartItems);
    })
  }
  clearUserCart(){
    this._CartService.clearUserCart().subscribe((res)=>{
      
      this.getLoggedUserCart()
      this._CartService.NumOfCartItems.next(0);
    })
  }
}

import { Component, inject, input ,Output,EventEmitter, WritableSignal, signal, OnInit} from '@angular/core';
import { Product } from '../../models/Iproduct';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../features/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../features/services/wishlist/wishlist.service';
import { CommonModule } from '@angular/common';
import { CheckplateformService } from '../../services/checkplateform/checkplateform.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-productcard',
  imports: [RouterLink,CommonModule,TranslatePipe],
  templateUrl: './productcard.component.html',
  styleUrl: './productcard.component.scss',
})
export class ProductcardComponent   {
product=input<Product>({}as Product);
_CartService:CartService=inject(CartService);
_WishlistService:WishlistService=inject(WishlistService);
_CheckplateformService:CheckplateformService=inject(CheckplateformService);
toastr = inject(ToastrService);


 

addProductToCart(productId:string){
  this._CartService.addProductToCart(productId).subscribe((res)=>{
    
    this.toastr.success(res.message,'',{
      progressBar:true,
      timeOut:2000
    })
    this._CartService.NumOfCartItems.next(res.numOfCartItems);
    
  })
}



toggleWishlist(productId:string){
  this._WishlistService.getLoggedUserWishlist().subscribe((res)=>{
    if(res.data.some(item=>item._id===productId)){
       this._WishlistService.removeProductFromWishlist(productId).subscribe((res)=>{
    console.log(res);
    this._WishlistService.NumOfWishlistItems.set(res.data.length)
    
        this.toastr.info(res.message,'',{
      progressBar:true,
      timeOut:2000
    })
    
    
    
  })
 
    }else{
      this._WishlistService.addProductToWishlist(productId).subscribe((res)=>{
     this.toastr.success(res.message,'',{
      progressBar:true,
      timeOut:2000
    })
    this._WishlistService.getLoggedUserWishlist().subscribe((res)=>{
      this._WishlistService.NumOfWishlistItems.set(res.count)
      
    })
    
  })
    }
  })
  
}
 

}

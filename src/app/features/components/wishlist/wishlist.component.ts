import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { WishlistService } from '../../services/wishlist/wishlist.service';
import {  product } from '../../../shared/models/Iwishlist';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink,TranslatePipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit{
  _WishlistService:WishlistService=inject(WishlistService);
  _CartService:CartService=inject(CartService);
  toastr = inject(ToastrService);
  wishlist:WritableSignal<product[]>=signal<product[]>([]);
ngOnInit(): void {
  this.getLoggedUserWishlist()
}

getLoggedUserWishlist(){
  this._WishlistService.getLoggedUserWishlist().subscribe((res)=>{

    this.wishlist.set(res.data)
    
    
  })
}

 addProductToCart(productId:string){
  this._CartService.addProductToCart(productId).subscribe((res)=>{
    
    this.toastr.success(res.message,'',{
      progressBar:true,
      timeOut:2000
    })
    this._CartService.NumOfCartItems.next(res.numOfCartItems);
    
  })
}
removeProductFromeWishlist(productId:string){
  this._WishlistService.removeProductFromWishlist(productId).subscribe((res)=>{
    this.getLoggedUserWishlist()
    this._WishlistService.NumOfWishlistItems.set(res.data.length)
    
  })

}


}

import { Component, effect, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FlowbiteService } from '../../../services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { CartService } from '../../../../features/services/cart/cart.service';
import { TranslatePipe } from '@ngx-translate/core';
import { MyTranslateService } from '../../../services/myTranslate/my-translate.service';
import { WishlistService } from '../../../../features/services/wishlist/wishlist.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive,TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  public _MyTranslateService:MyTranslateService=inject(MyTranslateService);
  cartItems:WritableSignal<number>=signal<number>(0);
  wishlistItems:WritableSignal<number>=signal<number>(0);
  isLogIn:boolean=false;
 constructor(private flowbiteService: FlowbiteService,public _AuthService:AuthService,public _CartService:CartService=inject(CartService),public _WishlistService:WishlistService=inject(WishlistService)) {
    effect(()=>{
    if(this._AuthService.userData()!=null){
      this.isLogIn=true;
    }else{
      this.isLogIn=false;
      
    }
   })
 }

  ngOnInit(): void {
    this._CartService.NumOfCartItems.subscribe({
      next:data=>{
        this.cartItems.set(data);
      
        
      }
    })
    this.wishlistItems=this._WishlistService.NumOfWishlistItems;
    
 
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }
}

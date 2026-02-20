import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../../shared/models/Iproduct';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../services/cart/cart.service';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { WishlistService } from '../../services/wishlist/wishlist.service';

@Component({
  selector: 'app-productdetails',
  imports: [],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.scss',
})
export class ProductdetailsComponent implements OnInit {
  constructor(private _ProductService:ProductService,private _ActivatedRoute:ActivatedRoute,private flowbiteService: FlowbiteService,private _WishlistService:WishlistService){

  }
  product:WritableSignal<Product>=signal<Product>({} as Product)
   
 ngOnInit(): void {
  this._ActivatedRoute.params.subscribe((data)=>{
    this.getSpecificProduct(data['id'])
    
  })
    this.flowbiteService.loadFlowbite((flowbite) => {
        initFlowbite();
      });
  //  this.getSpecificProduct()
 }

 getSpecificProduct(id:string){
   this._ProductService.getSpecificProduct(id).subscribe((res)=>{
    this.product.set(res.data)
    
    
   })
 }

 _CartService:CartService=inject(CartService);
toastr = inject(ToastrService);

addProductToCart(productId:string){
  this._CartService.addProductToCart(productId).subscribe((res)=>{
    
    this.toastr.success(res.message,'',{
      progressBar:true,
      timeOut:2000
    });
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

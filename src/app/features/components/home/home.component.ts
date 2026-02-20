import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { HomesliderComponent } from '../../../shared/components/homeslider/homeslider.component';
import { CategorysliderComponent } from '../../../shared/components/categoryslider/categoryslider.component';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../../shared/models/Iproduct';
import { ProductcardComponent } from '../../../shared/components/productcard/productcard.component';
import { BrandsliderComponent } from '../../../shared/components/brandslider/brandslider.component';

@Component({
  selector: 'app-home',
  imports: [HomesliderComponent,CategorysliderComponent,ProductcardComponent,BrandsliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private _ProductService:ProductService=inject(ProductService);
  productList:WritableSignal<Product[]>=signal<Product[]>([]);
  ngOnInit(): void {
    this.getAllProducts()
  }

  getAllProducts(){
    this._ProductService.getAllProducts().subscribe((res)=>{
      this.productList.set(res.data)
      // console.log(this.productList());
      
    })
  }


}

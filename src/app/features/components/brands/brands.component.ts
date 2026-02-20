import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { BrandService } from '../../services/brand/brand.service';
import { ActivatedRoute } from '@angular/router';
import { Brand } from '../../../shared/models/Ibrand';
import { BrandsliderComponent } from '../../../shared/components/brandslider/brandslider.component';
import { Product } from '../../../shared/models/Iproduct';
import { ProductcardComponent } from '../../../shared/components/productcard/productcard.component';

@Component({
  selector: 'app-brands',
  imports: [BrandsliderComponent,ProductcardComponent],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit {

  brand:WritableSignal<Brand>=signal<Brand>({}as Brand);
  _ActivatedRoute:ActivatedRoute=inject(ActivatedRoute);
  _BrandService:BrandService=inject(BrandService);
  productList:WritableSignal<Product[]>=signal<Product[]>([]);

  ngOnInit(): void {
    
      this._ActivatedRoute.paramMap.subscribe(params => {
    this.getSupBrand(params.get('id')!);
    this.getBrandProduct(params.get('id')!);
   
  });
    
  }
    
  getSupBrand(brandId:string){
    this._BrandService.getSupBrand(brandId).subscribe((res)=>{
      this.brand.set(res.data)
      console.log(this.brand());
      
    })
  }

  getBrandProduct(brandId:string){
    this._BrandService.getBrandProduct(brandId).subscribe((res)=>{
      this.productList.set(res.data)
      console.log(this.productList());
      

    })
  }

}

import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoryService } from '../../services/category/category.service';
import { ActivatedRoute } from '@angular/router';
import { Category, Product } from '../../../shared/models/Iproduct';
import { ProductcardComponent } from '../../../shared/components/productcard/productcard.component';
import { CategorysliderComponent } from '../../../shared/components/categoryslider/categoryslider.component';

@Component({
  selector: 'app-categories',
  imports: [ProductcardComponent,CategorysliderComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit{
  _CategoryService:CategoryService=inject(CategoryService);
  _ActivatedRoute:ActivatedRoute=inject(ActivatedRoute);
  Category:WritableSignal<Category>=signal<Category>({}as Category);
  productList:WritableSignal<Product[]>=signal<Product[]>([]);

  
  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe((data)=>{

      this.getSupCategory(data['id'])
      this.getCategoryProducts(data['id'])
      
    })
   
  }
  getSupCategory(categoryId:string){
    this._CategoryService.getSupCategory(categoryId).subscribe((res)=>{
      this.Category.set(res.data)
      
      
    })

  }
  getCategoryProducts(categoryId:string){
    this._CategoryService.getCategoryProducts(categoryId).subscribe((res)=>{
      this.productList.set(res.data);
      console.log(this.productList());
      
     
      
    })
  }

}

import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoryService } from '../../../features/services/category/category.service';
import { Category } from '../../models/Iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-categoryslider',
  imports: [CarouselModule,RouterLink,TranslatePipe],
  templateUrl: './categoryslider.component.html',
  styleUrl: './categoryslider.component.scss',
})
export class CategorysliderComponent implements OnInit {

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    rtl:true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-caret-left"></i>', '<i class="fa-solid  fa-caret-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 3
      },
      740: {
        items: 5
      },
      940: {
        items: 7
      }
    },
    nav: true
  }

  _CategoryService:CategoryService=inject(CategoryService);
  categoryList:WritableSignal<Category[]>=signal<Category[]>([]);
  ngOnInit(): void {
    this.getAllCategores()
  }
  getAllCategores(){
    this._CategoryService.getAllCategores().subscribe((res)=>{
     this.categoryList.set(res.data)
      
      
    })
  }
  getSupCategory(categoryId:string){
    this._CategoryService.getSupCategory(categoryId).subscribe((res)=>{
      console.log(res);
      
      
      
    })
  }

}

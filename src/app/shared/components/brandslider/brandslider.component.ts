import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { BrandService } from '../../../features/services/brand/brand.service';
import { Brand } from '../../models/Ibrand';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-brandslider',
  imports: [CarouselModule,RouterLink,TranslatePipe],
  templateUrl: './brandslider.component.html',
  styleUrl: './brandslider.component.scss',
})
export class BrandsliderComponent implements OnInit {

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
        items: 3
      },
      400: {
        items: 5
      },
      740: {
        items: 7
      },
      940: {
        items: 10
      }
    },
    nav: true
  }

  _BrandService:BrandService=inject(BrandService);
  brandList:WritableSignal<Brand[]>=signal<Brand[]>([]);


  ngOnInit(): void {
    this.getAllBrand()
  }

  getAllBrand(){
    this._BrandService.getAllBrand().subscribe((res)=>{
      this.brandList.set(res.data)
     
      
    })
  }
}

import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Product } from '../../../shared/models/Iproduct';
import { ProductService } from '../../services/product/product.service';
import { ProductcardComponent } from '../../../shared/components/productcard/productcard.component';
import { FormsModule } from '@angular/forms';
import { SearchproductPipe } from '../../../shared/pipes/searchproduct/searchproduct-pipe';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-products',
  imports: [ProductcardComponent,FormsModule,SearchproductPipe,TranslatePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
isLoading:WritableSignal<boolean>=signal<boolean>(false);
   private _ProductService:ProductService=inject(ProductService);
  productList:WritableSignal<Product[]>=signal<Product[]>([]);
  ngOnInit(): void {
    this.getProductsPage(this.currentPage,this.selectedSort)
  }
userSearch:string='';
selectedSort: string = '';

onSortChange() {
  
  this.currentPage = '1';
  this.getProductsPage(this.currentPage, this.selectedSort);
}

  currentPage = '1';

getProductsPage(page: string,sort:string=this.selectedSort) {
  this.currentPage = page;
  
  this._ProductService.getProductsPage(page,sort).subscribe({
    next: (res) => {
      this.productList.set(res.data);
      this.isLoading.set(true)
    }})
}

nextPage() {
  const current = Number(this.currentPage);

  if (current >= 3) return;

  const next = (current + 1).toString();
  this.getProductsPage(next,this.selectedSort);
}

prevPage() {
  const current = Number(this.currentPage);
  if (current <= 1) return;

  const prev = (current - 1).toString();
  this.getProductsPage(prev,this.selectedSort);
}





}

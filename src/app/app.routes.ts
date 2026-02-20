import { Routes } from '@angular/router';
import { HomeComponent } from './features/components/home/home.component';
import { CartComponent } from './features/components/cart/cart.component';
import { ProductsComponent } from './features/components/products/products.component';
import { BrandsComponent } from './features/components/brands/brands.component';
import { CategoriesComponent } from './features/components/categories/categories.component';
import { RegisterComponent } from './core/components/auth/register/register.component';
import { LoginComponent } from './core/components/auth/login/login.component';
import { NotfoundComponent } from './features/components/notfound/notfound.component';
import { authGuard } from './core/guards/auth/auth-guard';
import { ForgetpasswordComponent } from './core/components/auth/forgetpassword/forgetpassword.component';
import { ProductdetailsComponent } from './features/components/productdetails/productdetails.component';
import { ShippingaddressComponent } from './features/components/shippingaddress/shippingaddress.component';
import { AllordersComponent } from './features/components/allorders/allorders.component';
import { WishlistComponent } from './features/components/wishlist/wishlist.component';

export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:HomeComponent,title:'home'},
    {path:'cart',canActivate:[authGuard],component:CartComponent,title:'cart'},
    {path:'products',component:ProductsComponent,title:'products'},
    {path:'allorders',component:AllordersComponent,title:'allorders'},
    {path:'wishlist',component:WishlistComponent,title:'wishlist'},
    {path:'shippingaddress/:id',component:ShippingaddressComponent,title:'shippingaddress',data:{prerender:false} },
    {path:'productdetails/:id',component:ProductdetailsComponent,title:'productdetails',data:{prerender:false}},
    {path:'brands/:id',component:BrandsComponent,title:'brands',data:{prerender:false}},
    {path:'categories/:id',component:CategoriesComponent,title:'categories',data:{prerender:false}},
    {path:'register',component:RegisterComponent,title:'register'},
    {path:'login',component:LoginComponent,title:'login'},
    {path:'forgetpassword',component:ForgetpasswordComponent,title:'forgetpassword'},
    {path:'**',component:NotfoundComponent,title:'notfound'},
];

import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { OrderService } from '../../services/order/order.service';
import { Allorder } from '../../../shared/models/Iorder';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-allorders',
  imports: [RouterLink,TranslatePipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss',
})
export class AllordersComponent implements OnInit {
  _AuthService:AuthService=inject(AuthService);
  _OrderService:OrderService=inject(OrderService);
  userId!:string;
  orderList:WritableSignal<Allorder[]>=signal<Allorder[]>([]);
  ngOnInit(): void {
  
    this.userId=this._AuthService.userData()?.id||'';

    this.getAllOrders(this.userId!)
    
  }
  getAllOrders(userId:string){
    this._OrderService.getAllOrders(userId).subscribe((res)=>{
      this.orderList.set(res)
     
      
    })
  }



}

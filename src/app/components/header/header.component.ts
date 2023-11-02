import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  quantity: number = 0;

  constructor(private product_service: ProductsService) {
    this.product_service.item_added$.subscribe((value: any) => {
      var cart_number: any = localStorage.getItem('cart')
      this.quantity = JSON.parse(cart_number).length
    })
  }

  ngOnInit(): void {
    var cart_number: any = localStorage.getItem('cart')
    this.quantity = JSON.parse(cart_number).length
  }

}

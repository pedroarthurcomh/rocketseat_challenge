import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {
  product_id: any;
  product: any;

  constructor(private router: Router, private routee: ActivatedRoute, private product_service: ProductsService) {
    this.product_id = this.routee.snapshot.params['id']
  }

  ngOnInit(): void {
    this.product_service.get_specific_product(this.product_id).subscribe((res: any) => {
      this.product = res
      this.product.quantity = 0
    })
  }

  
  add_to_cart(){
    let cart_exist = localStorage.getItem('cart')

    let old_cart = []
    if(cart_exist){
      old_cart = JSON.parse(cart_exist)
      const productIndex = old_cart.findIndex((item: any) => item.id === this.product.id);
      if (productIndex !== -1) {
        old_cart[productIndex].quantity++;
      }else{
        this.product.quantity++
        old_cart.push(this.product)
      }
      let new_cart = JSON.stringify(old_cart)
      localStorage.setItem('cart', new_cart)
    } else{
      this.product.quantity++
      old_cart.push(this.product)
      let new_cart = JSON.stringify(old_cart)
      localStorage.setItem('cart', new_cart)
    }

    this.product_service.item_added$.emit(1)
  }
  
  price(initial_price: number){
    var price = initial_price/100
    return `R$ ${price.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`
  }
}

import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart_items: any;

  constructor(private product_service: ProductsService) {}

  ngOnInit(): void {
    if(localStorage.getItem('cart')){
      let cartJSON: any = localStorage.getItem('cart')
      let cart = JSON.parse(cartJSON)
      this.cart_items = cart
    } else {this.cart_items = undefined}

  }

  remove_item(id: any){
    let cart_exist = this.cart_items

    for(let item of cart_exist){
      if(item.id == id){
        this.cart_items = cart_exist.filter((item: any) => item.id !== id);
      }
    }
    localStorage.setItem('cart', JSON.stringify(this.cart_items))

    

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

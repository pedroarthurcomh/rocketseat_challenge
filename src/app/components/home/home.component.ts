import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any;
  category_filter:number = 1;

  constructor(private router: Router, private products_service: ProductsService) {}

  ngOnInit(): void {
    this.products_service.get_all_products().subscribe((res: any) => {
      this.products = res
    })
  }

  price(initial_price: number){
    var price = initial_price/100
    return `R$ ${price.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`
  }

  change_filter_category(value: number){
    this.category_filter = value
  }

}

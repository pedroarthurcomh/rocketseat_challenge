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

  change_filter_category(filter: string, id: number){
    this.category_filter = id
    let select = document.getElementById('order-by') as HTMLSelectElement
    select.options[0].selected = true

    if(filter === 'all'){
      this.products_service.get_all_products().subscribe((res: any) => {
        this.products = res
      })
    } else {
      this.products_service.get_by_category(filter).subscribe((res: any) => {
        this.products = res
      })
    }
  }

  orderBy(e: Event){
    const filterBy = (e.target as HTMLSelectElement).value;
    if(filterBy === 'mais-vendidos'){
      this.products = this.products.sort((a: any, b: any) => b.sales - a.sales);
    } else if(filterBy === 'novidades'){
      this.products = this.products.sort((a: any, b: any) => parseInt(b.created_at) - parseInt(a.created_at));
    } else if(filterBy === 'maior-menor'){
      this.products = this.products.sort((a: any, b: any) => b.price_in_cents - a.price_in_cents);
    } else if(filterBy === 'menor-maior'){
      this.products = this.products.sort((a: any, b: any) => a.price_in_cents - b.price_in_cents);
    }
  }

}

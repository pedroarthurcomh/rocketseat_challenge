import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  quantity: number = 0;
  querySearch: FormControl = new FormControl;

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

  search() {
    const listItems = document.querySelectorAll('.userss')
    let filter: any;
    this.querySearch.valueChanges.subscribe((digitado: any) => {
      filter = digitado.toLowerCase();

      if (digitado != '') {
        listItems.forEach((item: any) => {
          const itemId = item.id.toLowerCase();

          if (itemId.includes(filter)) {
          } else {
            item.style.display = 'none';
          }
        })
      } else {
        listItems.forEach((item: any) => {
          item.style.display = 'flex'
        })
      }
    })

  }
}

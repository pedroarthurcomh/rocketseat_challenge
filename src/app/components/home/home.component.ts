import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private products_service: ProductsService) {}

  ngOnInit(): void {
    this.products_service.get_all_products().subscribe((res: any) => {
      console.log(res)
    })
  }

}

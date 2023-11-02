import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public item_added$: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:3000/products'; 

  public get_all_products(): Observable<any> {
    return this.http.get(this.apiUrl)
  }

  get_specific_product(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`)
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:44493'; 

  public get_all_products(): Observable<any> {
    const query = `
      {
        allProducts {
          id
          name
          price_in_cents
        }
      }
    `;

    return this.http.post(this.apiUrl, { query });
  }

}

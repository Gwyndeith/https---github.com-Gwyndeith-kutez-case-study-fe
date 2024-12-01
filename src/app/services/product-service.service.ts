import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private GET_ALL_PRODUCTS_URL_SPRING =
    environment.springApiUrl + '/products/getAllProducts';

  private productListSubject = new BehaviorSubject({});
  public $productList = this.productListSubject.asObservable();

  private goldPriceByWeightSubject = new BehaviorSubject(0);
  public $goldPrice = this.goldPriceByWeightSubject.asObservable();

  constructor(private http: HttpClient) {
    this.http
      .get('https://data-asg.goldprice.org/dbXRates/USD')
      .subscribe((result: any) => {
        this.goldPriceByWeightSubject.next(result.items[0].xauPrice);
      });

    this.http.get(this.GET_ALL_PRODUCTS_URL_SPRING).subscribe({
      next: (response: any) => {
        console.log(response);

        this.$goldPrice.subscribe((goldPrice) => {
          response.forEach((element: any) => {
            element['price'] = element.weight * goldPrice;
          });
        });

        this.productListSubject.next(response);
      },
      error: (err) => {
        console.error('Error reading product details from JSON file: ', err);
      },
    });
  }
}

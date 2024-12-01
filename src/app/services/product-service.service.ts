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
      .get(
        `https://api.metalpriceapi.com/v1/latest?api_key=${environment.GOLD_PRICE_API_KEY}&base=USD&currencies=EUR,XAU,XAG`
      )
      .subscribe((result: any) => {
        console.log(result);

        // USDXAU is given for 1 ons of gold, 1 ons = 31.1035 grams
        this.goldPriceByWeightSubject.next(result.rates.USDXAU / 31.1035);
      });

    this.http.get(this.GET_ALL_PRODUCTS_URL_SPRING).subscribe({
      next: (response: any) => {
        console.log(response);

        this.$goldPrice.subscribe((goldPrice) => {
          response.forEach((element: any) => {
            element['price'] =
              (element.popularityScore + 1) * element.weight * goldPrice;
            element['rating'] = +(
              Math.round(((element.popularityScore * 5.0) / 100.0) * 2) / 2
            ).toFixed(1);
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

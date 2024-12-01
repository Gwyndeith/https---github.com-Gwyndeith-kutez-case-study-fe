import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ProductService } from '../../services/product-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'shop-layout',
  templateUrl: './shop-layout.component.html',
  styleUrl: './shop-layout.component.css',
})
export class ShopLayoutComponent implements OnInit {
  public productList: any;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private http: HttpClient,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.subscribeProductData();
  }

  subscribeProductData() {
    this.subscriptions.add(
      this.productService.$productList.subscribe((productList: any) => {
        this.productList = productList;
      })
    );
  }
}

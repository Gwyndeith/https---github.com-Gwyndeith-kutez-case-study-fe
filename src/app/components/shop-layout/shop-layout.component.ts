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

  private scrollInterval: any = null;
  private isScrolling: boolean = false;

  constructor(
    private http: HttpClient,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.subscribeProductData();
    this.handleLeftChevronTouchEvent();
    this.handleRightChevronTouchEvent();
  }

  subscribeProductData() {
    this.subscriptions.add(
      this.productService.$productList.subscribe((productList: any) => {
        this.productList = productList;
      })
    );
  }

  startScrollLeft() {
    if (this.isScrolling) return; // Avoid multiple intervals
    this.isScrolling = true;
    this.scrollInterval = setInterval(() => {
      const scrollableDiv = document.querySelector(
        '.product-list'
      ) as HTMLElement;
      scrollableDiv.scrollLeft -= 5; // Adjust speed by changing the value
    }, 5); // Scroll every 10ms
  }

  startScrollRight() {
    if (this.isScrolling) return;
    this.isScrolling = true;
    this.scrollInterval = setInterval(() => {
      const scrollableDiv = document.querySelector(
        '.product-list'
      ) as HTMLElement;
      scrollableDiv.scrollLeft += 5; // Adjust speed by changing the value
    }, 5); // Scroll every 10ms
  }

  // Method to stop scrolling when mouse button is released
  stopScroll() {
    if (this.scrollInterval) {
      clearInterval(this.scrollInterval); // Stop the scroll interval
      this.scrollInterval = null;
      this.isScrolling = false;
    }
  }

  // Optional: Stop scrolling if the mouse leaves the button area
  stopScrollOnMouseLeave() {
    this.stopScroll();
  }

  handleLeftChevronTouchEvent() {
    let button = document.getElementById('left-chevron');

    button?.addEventListener('touchstart', (event) => {
      if (this.isScrolling) return; // Avoid multiple intervals
      this.isScrolling = true;
      this.scrollInterval = setInterval(() => {
        const scrollableDiv = document.querySelector(
          '.product-list'
        ) as HTMLElement;
        scrollableDiv.scrollLeft -= 5; // Adjust speed by changing the value
      }, 5); // Scroll every 10ms
    });

    button?.addEventListener('touchend', (event) => {
      this.stopScroll();
    });

    button?.addEventListener('touchmove', (event) => {
      this.stopScroll();
    });
  }

  handleRightChevronTouchEvent() {
    let button = document.getElementById('right-chevron');

    button?.addEventListener('touchstart', (event) => {
      if (this.isScrolling) return;
      this.isScrolling = true;
      this.scrollInterval = setInterval(() => {
        const scrollableDiv = document.querySelector(
          '.product-list'
        ) as HTMLElement;
        scrollableDiv.scrollLeft += 5; // Adjust speed by changing the value
      }, 5); // Scroll every 10ms
    });

    button?.addEventListener('touchend', (event) => {
      this.stopScroll();
    });

    button?.addEventListener('touchmove', (event) => {
      this.stopScroll();
    });
  }
}

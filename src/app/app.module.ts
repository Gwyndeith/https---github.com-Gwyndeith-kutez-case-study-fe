import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ShopLayoutComponent } from './components/shop-layout/shop-layout.component';
import { provideHttpClient } from '@angular/common/http';
import { ProductListComponent } from './components/product-list/product-list.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatRippleModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { ProductService } from './services/product-service.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductCardComponent,
    ShopLayoutComponent,
    ProductListComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, MatRippleModule, MatRadioModule],
  providers: [provideHttpClient(), provideAnimationsAsync(), ProductService],
  bootstrap: [AppComponent],
})
export class AppModule {}

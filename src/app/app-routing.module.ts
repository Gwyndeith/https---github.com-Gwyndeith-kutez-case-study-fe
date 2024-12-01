import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopLayoutComponent } from './components/shop-layout/shop-layout.component';

const routes: Routes = [
  {
    path: '',
    component: ShopLayoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

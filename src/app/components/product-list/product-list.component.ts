import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  @Input() public productList: any;

  constructor() {}

  ngOnInit() {}
}

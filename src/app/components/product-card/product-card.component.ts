import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent implements OnInit {
  @Input() public product: any;
  public selectedImageURL: string = '';
  public selectedColor = 'Yellow';

  constructor() {}

  ngOnInit() {
    let productImageList: any[] = [];
    let imageKeys = Object.keys(this.product.images);
    let imageValues = Object.values(this.product.images);
    console.log(this.product.images);
    console.log(imageKeys);
    console.log(imageValues);
    imageKeys.forEach((imageKey, index) => {
      productImageList.push({
        [imageKey]: imageValues[index],
        color: imageKey,
      });
    });
    console.log(productImageList);
    this.product.images = productImageList;
    this.selectedImageURL = Object.values(productImageList[0])[0] as string;
  }

  changeProductSelectedColor(selectedProductColor: string, index: number) {
    let selectedColorTemp = Object.values(selectedProductColor)[1];
    let selectedColorURL = Object.values(selectedProductColor)[0];

    this.selectedColor =
      selectedColorTemp.charAt(0).toLocaleUpperCase() +
      selectedColorTemp.slice(1);

    // let colorOptions = document.querySelectorAll('.color-option');
    // colorOptions[this.product.productID * 3 + index - 3].classList.add(
    //   'selected'
    // );

    // console.log(this.product.productID * 3 + index - 3);
    this.selectedImageURL = Object.values(selectedProductColor)[0];
  }
}

import { Component, OnInit } from '@angular/core';
import {Product} from "../../common/product";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../services/product-service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {


  // The ! is the non-null assertion operator // Tells TypeScript compiler to suspend strict null and undefined checks for a property
  product!: Product;
  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handldeProductDetails();
    });
  }

  private handldeProductDetails() {
    // get the "id" param string. convert string to a number using the "+" symbol
    const theProductId: number = +this.route.snapshot.paramMap.get('id')!;

    this.productService.getProduct(theProductId).subscribe(
      data => {
        this.product = data;
      });
  }
}

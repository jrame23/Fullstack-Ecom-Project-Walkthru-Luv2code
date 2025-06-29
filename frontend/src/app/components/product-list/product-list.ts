import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})

export class ProductList implements OnInit{
  
  products: Product[] = [];

  currentCategoryId: number = 1;

  searchMode: boolean = false;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }
  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else {
    this.handleListProducts();
    }

  }

  handleSearchProducts() {

    // get the 'keyword' parameter from the route
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    // if we have a keyword, then search for products
    this.productService.searchProducts(theKeyword).subscribe(
      data => {
        this.products = data;
      }
    )
  }

  handleListProducts() {

    // Check if 'id' parameter exists in the route
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else {
      // no category id available ... default to 1
      this.currentCategoryId = 1;
    }
      //now get the products for the given category id
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      },
    )
  }

}

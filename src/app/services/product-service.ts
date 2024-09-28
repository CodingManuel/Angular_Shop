import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Product} from "../common/product";
import {ProductCategory} from "../common/product-category";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8000/api/products';
  private categoryUrl = 'http://localhost:8000/api/product-category';

  constructor(private httpClient: HttpClient) {
  }

  getProductListPaginate(thePage: number,
                         thePageSize: number,
                         theCategoryId: number): Observable<GetResponseProducts> {

    // need to build URL based on category id, page and size
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
                           +  `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getProductList(theCategoryId: number): Observable<Product[]> {

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getProducts(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    // call REST API
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      // Returns observable // Maps the JSON data from Spring Data REST to ProductCategory array
      map(response => response._embedded.productCategory)
    );
  }

  searchProducts(theKeyword: string): Observable<Product[]> {
    // need to build URL based on the keyword
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.getProducts(searchUrl);
  }

  private getProducts(searchUrl: string) {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }


  getProduct(theProductId: number): Observable<Product> {
    // need to build URL based on the product id
    const productUrl = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(productUrl);
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

// Unwraps the JSON from Spring Data REST _embedded entry
interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}

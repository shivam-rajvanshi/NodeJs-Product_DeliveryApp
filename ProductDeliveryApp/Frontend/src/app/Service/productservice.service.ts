import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {


  public serviceProductList: any;
  constructor(private http: HttpClient) {}

  getProducts() {
    // http://localhost:4000/api/v1/products/
    // https://fakestoreapi.com/products/
    return this.http.get<any>('http://localhost:4000/api/v1/products/').pipe(
      map((res: any) => {
        console.log('this is my resulted products :- ', res);
        this.serviceProductList = res;
        return res;
      })
    );
  }

  getOrders() {
    // http://localhost:4000/api/v1/products/
    // https://fakestoreapi.com/products/
    return this.http.get<any>('http://localhost:4000/api/v1/orders/').pipe(
      map((res: any) => {
        console.log('this is my resulted products :- ', res);
        this.serviceProductList = res;
        return res;
      })
    );
  }
}

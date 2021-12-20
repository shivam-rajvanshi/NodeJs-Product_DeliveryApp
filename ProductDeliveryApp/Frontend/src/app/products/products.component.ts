import { Component, OnInit } from '@angular/core';
import { ProductserviceService } from '../Service/productservice.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public productList: any;
  public mydata: any;
  constructor(private api: ProductserviceService) { }

  ngOnInit(): void {
    this.api.getProducts().subscribe((res) => {
      this.productList = res;
      // console.log(this.productList);
      this.productList.forEach((a: any) => {
        Object.assign(a, { quantity: 1, total: a.price });
      });
      this.mydata = this.productList;
    });
  }

  addtocart(event: any) {
    console.log(event.target.getAttribute('id'), JSON.stringify(event.target.getAttribute('value')));
    const id = event.target.getAttribute('id')
    const value = event.target.getAttribute('value')
    if (id == 1) {
      // order

      var requestOptions = {
        method: 'GET',
      };

      fetch(`http://localhost:4000/api/v1/products/${value}`, requestOptions)
        .then(response => response.text())
        .then(result => {
          console.log(result)
          const myresult = JSON.parse(result);
          console.log(myresult);


          //  ordereing the product

          var myHeaders = new Headers();
          myHeaders.append('Content-Type', 'application/json');

          var raw = JSON.stringify({
            product: myresult.id,
            noOfItems: 2,
            totalPrice: 0,
            phone: '9354860982',
            country: 'India',
            city: 'Delhi',
            zip: '110041',
            shippingAddress: 'i-90, shiv ram park',
          });

          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
          };

          fetch('http://localhost:4000/api/v1/orders/', requestOptions)
            .then((response) => response.text())
            .then((result) => {
              console.log(result)
              console.log('hurrah my order is booked');
            })
            .catch((error) => console.log('error', error));
        })
        .catch(error => console.log('error', error));

    } else if (id == 2) {
      // status update
    } else {
      // statu update
    }
    // this.cart.addProductIntoCart(item);
    // this.headerComponent.setCartItems();

  }

}

import { Component, OnInit } from '@angular/core';
import { ProductserviceService } from '../Service/productservice.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private orders: ProductserviceService) { }

  productList: any;

  ngOnInit(): void {
    this.orders.getOrders().subscribe((res) => {
      this.productList = res;
      console.log(this.productList);
    });
  }

  addtocart(event: any) {
    console.log(event.target.getAttribute('value'));
    const id = event.target.getAttribute('id');
    const value = event.target.getAttribute('value');
    // console.log(data);
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    let status = id == 1 ? 'on the way' : 'delivered';
    var raw = JSON.stringify({
      status: status,
    });

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
    };

    fetch(`http://localhost:4000/api/v1/orders/${value}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  }
}



import { Component, OnInit } from '@angular/core';
import {ShipmentService} from '../../../services/shipment.service';
import {Shipment} from '../../../models/data/shipment/shipment';

@Component({
  selector: 'app-shipment-list',
  templateUrl: './shipment-list.component.html',
  styleUrls: ['./shipment-list.component.css'],
  providers: [ShipmentService]
})
export class ShipmentListComponent implements OnInit {

  shipments: Shipment[] = [];
  limit = 10;
  offset = 1;
  currentPage = 1;
  count = 0;

  constructor(private shipmentService:ShipmentService) { }


  ngOnInit() {
    this.offset = (this.currentPage * this.limit) - this.limit;
    if(this.offset <=0) {
      this.offset = 1;
    }
    this.getShipment();
  }
  getShipment(){
    this.shipmentService.getAll(this.limit,this.offset).subscribe(
      data=> {
      this.shipments = data.result;
      this.count = data.totalResult;
      console.log(data);
    });
  }

  pageChanged(pageNumber) {
    this.offset = ((pageNumber * this.limit) - this.limit) === 0 ? 1 :((pageNumber * this.limit) - this.limit) ;
    this.getShipment();
    this.currentPage = pageNumber;
  }

}

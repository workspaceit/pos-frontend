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
  shipments:Shipment[];
  constructor(private shipmentService:ShipmentService) { }

  ngOnInit() {
    this.getShipment();
  }
  getShipment(){
    this.shipmentService.getAll(10,1).subscribe((data)=>{
      this.shipments = data.result;
    });
  }

}

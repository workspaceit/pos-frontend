import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {InvoiceService} from '../../../../services/invoice.service';
import {Invoice} from '../../../../models/data/invoice/invoice';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
  providers: [InvoiceService]
})
export class InvoiceComponent implements OnInit {

  respectiveId: number;
  invoiceFor: string;
  invoice: Invoice = new Invoice();
  imgUrl= environment.imgUrl;
  receiptTag: string;

  constructor(private activatedRoute: ActivatedRoute,private invoiceService: InvoiceService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => {
        this.respectiveId = params['respectiveId'];
        this.invoiceFor = params['invoiceFor'];
        console.log(this.respectiveId);
        console.log(this.invoiceFor);
        if(this.invoiceFor === 'shipment')
        {
          this.getShipmentInvoice();
          this.invoiceFor = 'Shipment';
          this.receiptTag = 'Paid';
        }
        else
        {
          this.getSaleInvoice();
          this.invoiceFor = 'Sale';
          this.receiptTag = 'Received'
        }

      }
    );
  }

  getShipmentInvoice(){
    this.invoiceService.getInvoiceByShipmentId(this.respectiveId).subscribe(
      invoice => {
        this.invoice = invoice;
        console.log(this.invoice);
      },
      error => {

      }
    );
  }
  getSaleInvoice(){
    this.invoiceService.getInvoiceBySaleId(this.respectiveId).subscribe(
      invoice => {
        this.invoice = invoice;
        console.log(this.invoice);
      }
    );
  }


}

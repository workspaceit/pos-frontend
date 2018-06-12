import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {InvoiceService} from '../../../../services/invoice.service';
import {Invoice} from '../../../../models/data/invoice/invoice';

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

  constructor(private activatedRoute: ActivatedRoute,private invoiceService: InvoiceService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => {
        this.respectiveId = params['respectiveId'];
        this.invoiceFor = params['invoiceFor'];
        console.log(this.respectiveId);
        this.getShipmentInvoice();
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

}

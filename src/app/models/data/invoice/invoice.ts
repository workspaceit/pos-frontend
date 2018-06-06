import {InvoiceDetails} from './invoice-details';
import {InvoiceBilling} from './invoice-billing';
import {Shop} from '../shop';

export class Invoice {
    shop:Shop;
    details:InvoiceDetails[];
    billTo:InvoiceBilling;
    invoiceTackingId:string;
    discount: number;
    issueDate:string;
    total: number;
    vat: number;
    paidOrReceive: number;
    due: number;
    shipmentCost:{};
}

import {InvoiceDetails} from './invoice-details';
import {InvoiceBilling} from './invoice-billing';
import {Shop} from '../shop';

export class Invoice {
    shopInformation: Shop = new Shop();
    details:InvoiceDetails[];
    billTo: InvoiceBilling = new InvoiceBilling();
    invoiceTackingId:string;
    discount: number;
    issueDate: number;
    total: number;
    vat: number;
    paidOrReceive: number;
    due: number;
    shipmentCost:{};
}

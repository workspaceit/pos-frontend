import {BaseService} from './base.service';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Invoice} from '../models/data/invoice/invoice';

@Injectable()
export class InvoiceService extends BaseService{
  constructor(private httpClient: HttpClient, private authService: AuthService) {
    super();
  }
  public getInvoiceBySaleId(saleId:number):Observable<Invoice>{
    return this.httpClient.get<Invoice>(this.authApiUrl + '	/api/invoice/sale/' + saleId);
  }
  public getInvoiceByShipmentId(shipmentId:number):Observable<Invoice>{
    return this.httpClient.get<Invoice>(this.authApiUrl + '	/api/invoice/shipment/' + shipmentId);
  }
  public getInvoiceByTracking(shipmentId:number):Observable<Invoice>{
    return this.httpClient.get<Invoice>(this.authApiUrl + '	/api/invoice/get-by-tracking-id/' + shipmentId);
  }
}

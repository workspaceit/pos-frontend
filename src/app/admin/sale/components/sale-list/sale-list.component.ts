import { Component, OnInit } from '@angular/core';
import {Sale} from '../../../../models/data/sale/sale';
import {SaleService} from '../../../../services/sale.service';

@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.css'],
  providers: [SaleService]
})
export class SaleListComponent implements OnInit {

  sales: Sale[] = [];
  limit = 10;
  offset = 1;
  currentPage = 1;
  count = 0;
  constructor( private  saleService: SaleService) { }

  ngOnInit() {
    this.offset = (this.currentPage * this.limit) - this.limit;
    if(this.offset <=0) {
      this.offset = 1;
    }
    this.getSale();
  }
  getSale(){
    this.saleService.getAll(this.limit,this.offset).subscribe(
      data=> {
        this.sales = data.result;
        this.count = data.totalResult;
        console.log(data);
      });
  }
  pageChanged(pageNumber) {
    this.offset = ((pageNumber * this.limit) - this.limit) === 0 ? 1 :((pageNumber * this.limit) - this.limit) ;
    this.getSale();
    this.currentPage = pageNumber;
  }

}

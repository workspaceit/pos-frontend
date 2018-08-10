import { Component, OnInit } from '@angular/core';
import {Ledger} from '../../../../models/data/accounting/ledger';
import {LedgerService} from '../../../../services/ledger-service';

@Component({
  selector: 'app-ledger-list',
  templateUrl: './ledger-list.component.html',
  styleUrls: ['./ledger-list.component.css'],
  providers: [LedgerService]
})
export class LedgerListComponent implements OnInit {

  ledgers: Ledger[] = [];
  limit = 10;
  offset = 1;
  currentPage = 1;
  count = 0;

  constructor(private ledgerService: LedgerService) { }

  ngOnInit() {
    this.offset = (this.currentPage * this.limit) - this.limit;
    if(this.offset <=0) {
      this.offset = 1;
    }
    this.getLedger();
  }
  getLedger(){
    this.ledgerService.getAll(this.limit,this.offset).subscribe(
      data=> {
        this.ledgers= data;
        // this.count = data.totalResult;
        console.log(this.ledgers);
      });
  }
  pageChanged(pageNumber) {
    this.offset = ((pageNumber * this.limit) - this.limit) === 0 ? 1 :((pageNumber * this.limit) - this.limit) ;
    this.getLedger();
    this.currentPage = pageNumber;
  }

}

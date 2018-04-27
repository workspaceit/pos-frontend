import { Component, OnInit } from '@angular/core';
import {Wholesaler} from '../../../../models/data/wholesaler';
import {WholesalerService} from '../../../../services/wholesaler.service';

@Component({
  selector: 'app-wholesaler-list',
  templateUrl: './wholesaler-list.component.html',
  styleUrls: ['./wholesaler-list.component.css'],
  providers: [WholesalerService]
})
export class WholesalerListComponent implements OnInit {

  wholesalers: Wholesaler[] = [];

  constructor(private wholesalerService: WholesalerService) { }

  ngOnInit() {
    this.getWholesalers();
  }

  getWholesalers(){
    this.wholesalerService.getWholesalers().subscribe(
      data => {
        this.wholesalers = data;
      }
    );
  }

}

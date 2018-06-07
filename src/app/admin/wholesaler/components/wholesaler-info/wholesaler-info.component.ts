import { Component, OnInit } from '@angular/core';
import {WholesalerService} from '../../../../services/wholesaler.service';
import {ActivatedRoute} from '@angular/router';
import {Wholesaler} from '../../../../models/data/wholesaler';

@Component({
  selector: 'app-wholesaler-info',
  templateUrl: './wholesaler-info.component.html',
  styleUrls: ['./wholesaler-info.component.css'],
  providers: [WholesalerService]
})
export class WholesalerInfoComponent implements OnInit {
  wholesalerId: number;
  wholesaler:Wholesaler = new Wholesaler();

  constructor(private activatedRoute: ActivatedRoute,private wholesalerService: WholesalerService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params)=>{
      this.wholesalerId = params['id'];
      this.getWholesaler();
    });
  }
  private getWholesaler(){
    this.wholesalerService.getWholesalerById(this.wholesalerId).subscribe((data)=>{
        this.wholesaler = data;
    });
  }
}

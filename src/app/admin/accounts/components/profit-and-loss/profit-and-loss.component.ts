import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../../../services/report.service';
import {ProfitAndLossReport} from '../../../../models/data/report/profit-and-loss-report';

@Component({
  selector: 'app-profit-and-loss',
  templateUrl: './profit-and-loss.component.html',
  styleUrls: ['./profit-and-loss.component.css'],
  providers:[CategoryService]
})
export class ProfitAndLossComponent implements OnInit {
  protected profitAndLossReport:ProfitAndLossReport;

  constructor(private categoryService:CategoryService) {
   this.profitAndLossReport = new ProfitAndLossReport();
  }

  private getProfitAndLoss(){
    this.categoryService.getProfitandLoss('2014-02-02','2018-08-12').subscribe(value => {
        this.profitAndLossReport = value;
    });
  }
  ngOnInit() {
    this.getProfitAndLoss();
  }

}

import {Component, Input, OnInit} from '@angular/core';
import {ReportAccount} from '../../../../models/data/report/report-account';

@Component({
  selector: 'app-report-row',
  templateUrl: './report-row.component.html',
  styleUrls: ['./report-row.component.css']
})
export class ReportRowComponent implements OnInit {
  @Input('reportAccounts')
  protected reportAccount:ReportAccount;
  constructor() {

  }

  ngOnInit() {
  }

}

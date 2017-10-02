import * as angular from 'angular';
import { Component, OnInit, Input } from '@angular/core';
import { downgradeComponent } from '@angular/upgrade/static';

import { TableColumn } from './table-column';

@Component({
  selector: 'app-ng4-data-table',
  templateUrl: './ng4-data-table.component.html',
  styleUrls: ['./ng4-data-table.component.css']
})
export class Ng4DataTableComponent implements OnInit {
	@Input() columns: TableColumn[];
  @Input() data: Array<any[]>;
  
  constructor() { }

  ngOnInit() {
  }

}
angular.module('ng4DataTable', ['app.ng1Component']).directive('ng4DataTable', downgradeComponent({ component: Ng4DataTableComponent }));
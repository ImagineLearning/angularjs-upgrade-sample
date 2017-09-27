import { Component, Input, OnInit } from '@angular/core';

import { TableColumn } from './table-column';

@Component({
	selector: 'ng4-data-table',
	templateUrl: 'data-table.component.html'
})
export class DataTableComponent implements OnInit {
	@Input() columns: TableColumn[];
	@Input() data: Array<any[]>;

	constructor() {}

	ngOnInit() {}
}

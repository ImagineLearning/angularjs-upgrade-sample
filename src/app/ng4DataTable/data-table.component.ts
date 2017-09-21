import { Component, Input, OnInit } from '@angular/core';

import { TableColumn } from './table-column';

@Component({
	selector: 'ng4-data-table',
	templateUrl: 'app/ng4DataTable/data-table.component.html' // Path relative to build directory
})
export class DataTableComponent implements OnInit {
	@Input() columns: TableColumn[];
	@Input() data: Array<any[]>;

	constructor() {}

	ngOnInit() {}
}

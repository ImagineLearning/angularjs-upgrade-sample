import 'angular';

import { Directive, ElementRef, Injector, OnInit } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({ selector: 'ng1-data-table' })
export class Ng1DataTableComponent extends UpgradeComponent implements OnInit {
	constructor(elem: ElementRef, injector: Injector) {
		super('ng1DataTable', elem, injector);
	}

	ngOnInit() {
		return super.ngOnInit();
	}
}

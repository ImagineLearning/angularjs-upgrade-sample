import 'angular';

import { Directive, ElementRef, Injector, OnInit } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({ selector: 'ng1-root' })
export class Ng1RootComponent extends UpgradeComponent implements OnInit {
	constructor(elem: ElementRef, injector: Injector) {
		super('ng1Root', elem, injector);
	}

	ngOnInit() {
		return super.ngOnInit();
	}
}

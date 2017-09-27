import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule } from '@angular/upgrade/static';

import { DataTableModule } from './ng4DataTable/data-table.module';

@NgModule({
	imports: [BrowserModule, UpgradeModule, DataTableModule]
})
export class AppUpgradeModule {
	constructor(private upgrade: UpgradeModule) {}

	ngDoBootstrap() {
		this.upgrade.bootstrap(document.body, ['app']);
	}
}

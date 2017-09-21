import * as angular from 'angular';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { downgradeComponent } from '@angular/upgrade/static';

import { DataTableComponent } from './data-table.component';

@NgModule({
	imports: [CommonModule],
	exports: [],
	declarations: [DataTableComponent],
	providers: [],
	entryComponents: [DataTableComponent] // Needed to add it here to get it to load in AngularJS
})
export class DataTableModule {}

// Hook it up for AngularJS
const m = angular.module('ng4DataTable', []);
m.directive('ng4DataTable', downgradeComponent({ component: DataTableComponent }));

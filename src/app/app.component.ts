import * as angular from 'angular';

import { Component } from '@angular/core';
import { downgradeComponent } from '@angular/upgrade/static';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}

let appModule = angular.module('app').component('appRoot', downgradeComponent({ component: AppComponent }));
console.log('appModule: ');
console.log(appModule);

let dataTableModule = angular.module('app.dataTable');
console.log('dataTableModule: ');
console.log(dataTableModule);
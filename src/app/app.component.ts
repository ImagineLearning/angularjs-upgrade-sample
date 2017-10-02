import * as angular from 'angular';

import { Component } from '@angular/core';
import { downgradeComponent } from '@angular/upgrade/static';

@Component({
  selector: 'bob-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}

angular.module('app').directive('appRoot', downgradeComponent({ component: AppComponent }));
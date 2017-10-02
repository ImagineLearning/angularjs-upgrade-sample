import * as angular from 'angular';

import { Component, OnInit } from '@angular/core';
import { downgradeComponent } from '@angular/upgrade/static';

@Component({
  selector: 'app-ng4component',
  templateUrl: './ng4component.component.html',
  styleUrls: ['./ng4component.component.css']
})
export class Ng4componentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
angular.module('app').directive('ng4Component', downgradeComponent({ component: Ng4componentComponent }));

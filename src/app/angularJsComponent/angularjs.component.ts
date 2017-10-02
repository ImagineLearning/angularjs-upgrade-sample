import * as angular from 'angular';

import { Directive, ElementRef, EventEmitter, Injector, Input, Output } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

const m = angular.module('app');

@Directive({ selector: 'angularjs-component' })
export class AngularJSComponent extends UpgradeComponent {
    @Input() counterTimes2: number;
    @Output() multiply: EventEmitter<number>;

    @Input() twoWay: number;
    @Output() twoWayChange: EventEmitter<number>;

    constructor(ref: ElementRef, inj: Injector) {
        super('angularjsComponent', ref, inj);
    }
}
m.component('angularjsComponent', {
    bindings: {
        counterTimes2: '<',
        multiply: '&',
        twoWay: '='
    },
    template: 
//     `
//     <div style="background-color: lightcoral; padding: 10px; margin: 10px;">
//       <h3>angularjsComponent written in AngularJS and upgraded to Angular</h3>
//       <div><ng-transclude></ng-transclude></div>
//       <div>Bound via a two-way binding: <input ng-model="$ctrl.twoWay"></div>
//       <div>counterTimes2: {{$ctrl.counterTimes2}}</div>
//       <div><button ng-click="$ctrl.multiply(2)">Double</button></div>
//       <angular-component [counter-times-4]="$ctrl.counterTimes2 * 2" (multiply)="$ctrl.multiply($event)">
//         Projected from parent: {{$ctrl.counterTimes2}}
//       </angular-component>
//     </div>
//    `
    `
    <div>
        <h3>angularjsComponent works</h3>
        <ng4-component></ng4-component>
    </div>
    `
});
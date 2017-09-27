import * as angular from 'angular';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UpgradeModule, downgradeComponent } from '@angular/upgrade/static';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppComponent } from './app.component';
import { Ng4DataTableComponent } from './ng4-data-table/ng4-data-table.component';
// import { Ng1DataTableDirective } from './ng1DataTable/data-table-component';
// import { Ng1DataTable } from './ng1DataTable/data-table.directive.js';

@NgModule({
  declarations: [
    AppComponent,
    Ng4DataTableComponent,
    // Ng1DataTableDirective
  ],
  imports: [
    BrowserModule,
    UpgradeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AppComponent] // Needed to add it here to get it to load in AngularJS  
})
export class AppModule {

  constructor(private upgrade: UpgradeModule) {
    // Access global AngularJS 1.x object
    // const m = angular.module('AngularJsModule', []);
    // m.directive('appRoot', downgradeComponent({ component: AppComponent }));
  }

  ngDoBootstrap() {
    this.upgrade.bootstrap(document.body, ['app']);
  }
}

// platformBrowserDynamic().bootstrapModule(AppModule);


// Hook it up for AngularJS
// const m = angular.module('ng4DataTable', []);
// m.directive('ng4DataTable', downgradeComponent({ component: DataTableComponent }));

// const m = angular.module('ng4AppComponent', []);
// m.directive('ng4AppComponent', downgradeComponent({ component: AppComponent }));
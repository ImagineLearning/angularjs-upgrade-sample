import * as angular from 'angular';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UpgradeModule, downgradeComponent } from '@angular/upgrade/static';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppComponent } from './app.component';
// import { Ng1DataTableComponent } from './ng1DataTable/data-table.component';
import { Ng4DataTableComponent } from './ng4-data-table/ng4-data-table.component';
import { Ng4componentComponent } from './ng4component/ng4component.component';
import { AngularJSComponent } from './angularJsComponent/angularjs.component';

import { Ng1RootComponent } from './ng1Root/ng1Root.component';

@NgModule({
  declarations: [
    AppComponent,
    // Ng1DataTableComponent,
    Ng4DataTableComponent,
    Ng4componentComponent,
    AngularJSComponent,
    Ng1RootComponent
  ],
  imports: [
    BrowserModule,
    UpgradeModule
  ],
  providers: [],
  // bootstrap: [AppComponent],
  entryComponents: [AppComponent, Ng4componentComponent, Ng4DataTableComponent] // Needed to add it here to get it to load in AngularJS  
})
export class AppModule {

  constructor(private upgrade: UpgradeModule) {
  }

  ngDoBootstrap() {
    this.upgrade.bootstrap(document.body, ['app']);
  }
}
import './polyfills';
import './app/app.imports';
import './styles.scss';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppUpgradeModule } from './app/app-upgrade.module';

platformBrowserDynamic().bootstrapModule(AppUpgradeModule);

(function() {
	'use strict';

	angular.module('app', [
		'app.ng1Root',
		'app.data',
		'app.dataTable',
		'app.timer',
		'ng4DataTable', // Include downgraded Angular module to make it available in AngularJS
		// 'ng4AppComponent'
		//'ng4Component'
		// 'app.ng1Component'
	]);
})();

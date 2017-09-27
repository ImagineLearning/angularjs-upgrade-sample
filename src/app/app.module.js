(function() {
	'use strict';
	console.log("test");

	angular.module('app', [
		'app.data',
		'app.dataTable',
		'app.timer',
		//'ng4DataTable', // Include downgraded Angular module to make it available in AngularJS
		// 'ng4AppComponent'
	]);
})();

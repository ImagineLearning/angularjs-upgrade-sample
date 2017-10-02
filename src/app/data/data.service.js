(function() {
	'use strict';

	angular.module('app.data').service('Data', DataService);

	DataService.$inject = ['$http'];
	function DataService($http) {
		console.log("DataService");
		this.get = get;

		////////////////

		function get() {
			console.log("DataService.get()");
			return $http.get('/assets/data.json').then(function(response) {
				return response.data;
			});
		}
	}
})();

(function() {
	'use strict';

	angular.module('app.data').service('Data', DataService);

	DataService.$inject = ['$http'];
	function DataService($http) {
		this.get = get;

		////////////////

		function get() {
			return $http.get('/assets/data.json').then(function(response) {
				return response.data;
			});
		}
	}
})();

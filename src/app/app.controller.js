(function() {
	'use strict';

	console.log("test");

	angular.module('app').controller('AppController', AppController);

	AppController.$inject = ['$log', '$filter', '$scope', 'Data'];
	function AppController($log, $filter, $scope, Data) {
		console.log("AppController");
		var vm = this;

		// Model
		vm.data = [];
		vm.displayData = [];
		vm.numRows = 20;
		vm.filter = '';
		vm.columns = [
			{ name: 'id', display: 'ID' },
			{ name: 'firstName', display: 'First Name' },
			{ name: 'lastName', display: 'Last Name' },
			{ name: 'email', display: 'Email' }
		];

		activate();

		////////////////

		function activate() {
			console.log("activate()");
			Data.get()
				.then(function(data) {
					console.log("got data");
					vm.data = data;
					populateDisplayData();
				})
				.catch(function(error) {
					console.log(error);
					$log.error(error);
				});

			$scope.$watch(function() {
				return vm.numRows;
			}, onNumRowsChanged)

			$scope.$watch(function() {
				return vm.filter;
			}, onFilterChanged);
		}

		function onNumRowsChanged(newValue, oldValue) {
			console.log("onNumRowsChanged");
			if (newValue !== oldValue) {
				populateDisplayData();
			}
		}

		function onFilterChanged(newValue, oldValue) {
			if (newValue !== oldValue) {
				populateDisplayData();
			}
		}

		function populateDisplayData() {
			vm.displayData = $filter('filter')(vm.data, vm.filter).slice(0, vm.numRows);
		}
	}
})();

(function() {
	'use strict';

	angular.module('app').controller('AppController', AppController);

	AppController.$inject = ['$log', 'Data'];
	function AppController($log, Data) {
		var vm = this;
		vm.data = undefined;
		vm.columns = [
			{name: 'id', display: 'ID'},
			{name: 'firstName', display: 'First Name'},
			{name: 'lastName', display: 'Last Name'},
			{name: 'email', display: 'Email'}
		]

		activate();

		////////////////

		function activate() {
			Data.get()
				.then(function(data) {
					vm.data = data;
				})
				.catch(function(error) {
					$log.error(error);
				});
		}
	}
})();

(function() {
	'use strict';

	angular.module('app').controller('AppController', AppController);

	AppController.$inject = ['$log', 'Data'];
	function AppController($log, Data) {
		var vm = this;
		vm.data = undefined;

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

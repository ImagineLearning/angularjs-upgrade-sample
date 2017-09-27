(function() {
	'use strict';

	angular.module('app.dataTable').directive('ng1DataTable', DataTableDirective);

	DataTableDirective.$inject = ['Data'];
	function DataTableDirective(Data) {
		// Usage:
		//
		// Creates:
		//
		var directive = {
			bindToController: true,
			controller: DataTableController,
			controllerAs: '$ctrl',
			link: link,
			restrict: 'E',
			scope: {
				data: '=',
				columns: '='
			},
			templateUrl: 'app/ng1DataTable/data-table.html',
			// selector: 'ng1-data-table'
		};
		return directive;

		function link(scope, element, attrs) {}
	}
	/* @ngInject */
	function DataTableController() {}
})();

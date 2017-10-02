(function() {
	'use strict';

	angular.module('app.dataTable').directive('ng1DataTable', DataTableDirective);
	// angular.module('app').directive('ng1DataTable', DataTableDirective);

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
			template: 
			// "<p>ng1-data-table works if inline!</p>" +
			// "<ng4-component></ng4-component>" +
			// "<ng1-component></ng1-component>"
			`
			<div class="data-table card">
				<div class="card-divider">
					<h2>ng1 Data Table Directive</h2>
				</div>
				<table>
					<thead>
						<tr>
							<th ng-repeat="col in $ctrl.columns track by col.name" ng-bind="col.display"></th>
						</tr>
					</thead>
					<tbody>
						<tr ng-repeat="row in $ctrl.data track by $index">
							<td ng-repeat="col in $ctrl.columns track by col.name" ng-bind="row[col.name]"></td>
						</tr>
					</tbody>
				</table>
			</div>
			<ng1-component></ng1-component>
			<ng4-component></ng4-component>
			<app-ng4component></app-ng4component>
			`
			// templateUrl: './app/ng1DataTable/data-table.html',
			// template: require('app/ng1DataTable/data-table.html'),
		};
		return directive;

		function link(scope, element, attrs) {}
	}
	/* @ngInject */
	function DataTableController() {}
})();

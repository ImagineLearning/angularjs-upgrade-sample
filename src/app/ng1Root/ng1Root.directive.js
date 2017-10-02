(function() {
	'use strict';

	angular.module('app.ng1Root').directive('ng1Root', Ng1RootDirective);

	Ng1RootDirective.$inject = ['Data'];
	function Ng1RootDirective(Data) {
		// Usage:
		//
		// Creates:
		//
		var directive = {
			bindToController: true,
			controller: Ng1RootController,
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
        <div ng-controller="AppController as $ctrl">
            <h2>ng1 App</h2>
                <div class="row">
                    <div class="large-4 medium-6 small-12 columns">
                        <label>
                            Rows:
                            <input type="number" ng-model="$ctrl.numRows" ng-model-options="{ updateOn: 'default', debounce: 300 }" />
                        </label>
                    </div>
                    <div class="large-4 medium-6 small-12 columns">
                        <label>
                            Filter:
                            <input type="text" ng-model="$ctrl.filter" ng-model-options="{ updateOn: 'default', debounce: 300 }" />
                        </label>
                    </div>
                </div>
                <hr />
                <div class="row">
                    <div class="medium-6 small-12 columns">
                        <ng1-data-table data="$ctrl.displayData" columns="$ctrl.columns"></ng1-data-table>
                    </div>
                    <div class="medium-6 small-12 columns">
                        <ng4-data-table [data]="$ctrl.displayData" [columns]="$ctrl.columns"></ng4-data-table>
                    </div>
                </div>
            </div>
        </div>
		`
		};
		return directive;

		function link(scope, element, attrs) {}
	}
	/* @ngInject */
	function Ng1RootController() {}
})();

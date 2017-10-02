(function() {
	'use strict';

    angular.module('app.ng1Component').directive('ng1Component', Ng1ComponentDirective);

	Ng1ComponentDirective.$inject = ['Data'];
	function Ng1ComponentDirective(Data) {    
		// Usage:
		//
		// Creates:
		//
		var directive = {
			bindToController: true,
			controller: Ng1ComponentController,
			controllerAs: '$ctrl',
			link: link,
			restrict: 'E',
			scope: {
				data: '=',
				columns: '='
			},
            template: "<p>ng1-component works!</p>"  
			// templateUrl: './app/ng1DataTable/data-table.html',
			// template: require('app/ng1DataTable/data-table.html'),
		};
		return directive;

		function link(scope, element, attrs) {}
	}
	/* @ngInject */
	function Ng1ComponentController() {}
})();

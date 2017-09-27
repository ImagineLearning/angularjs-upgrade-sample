(function() {
	'use strict';

	angular.module('app.timer').directive('ng1Timer', TimerDirective);

	TimerDirective.$inject = [];
	function TimerDirective() {
		// Usage:
		//
		// Creates:
		//
		var directive = {
			bindToController: true,
			controller: 'TimerController',
			controllerAs: '$ctrl',
			link: link,
			restrict: 'E',
			scope: {},
			templateUrl: 'app/ng1Timer/timer.html'
		};
		return directive;

		function link(scope, element, attrs, ctrl) {}
	}
})();

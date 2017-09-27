(function() {
	'use strict';

	angular.module('app.timer').service('Performance', PerformanceService);

	PerformanceService.$inject = ['$window'];
	function PerformanceService($window) {
		this.now = nowFn();

		////////////////

		function nowFn() {
			if ($window.performance && $window.performance.now) {
				return $window.performance.now.bind($window.performance);
			}
			if (Date.now) {
				return Date.now.bind(Date);
			}
			return new Date().getTime;
		}
	}
})();

(function() {
	'use strict';

	angular.module('app.timer').controller('TimerController', TimerController);

	TimerController.$inject = ['$interval', 'Performance'];
	function TimerController($interval, Performance) {
		var $ctrl = this,
			startTimestamp = 0,
			timer;

		// Model
		$ctrl.elapsed = 0;

		// Public functions
		$ctrl.clear = clear;
		$ctrl.start = start;
		$ctrl.stop = stop;

		////////////////

		function clear() {
			stop();
			$ctrl.elapsed = 0;
		}

		function start() {
			startTimestamp = Performance.now();
			timer = $interval(onInterval, 70);
		}

		function stop() {
			if (timer) {
				$interval.cancel(timer);
			}
		}

		function onInterval() {
			var now = Performance.now();
			$ctrl.elapsed = now - startTimestamp;
		}
	}
})();

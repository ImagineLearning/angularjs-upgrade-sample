(function() {
	describe('AppController', function() {
		var $controller,
			$log,
			$q,
			$rootScope,
			controller,
			Data,
			tableData = [
				{ id: 1, firstName: 'First One', lastName: 'Last One' },
				{ id: 2, firstName: 'First Two', lastName: 'Last Two' },
				{ id: 3, firstName: 'First Three', lastName: 'Last Three' },
				{ id: 4, firstName: 'First Four', lastName: 'Last Four' },
				{ id: 5, firstName: 'First Five', lastName: 'Last Five' }
			];

		beforeEach(function() {
			module('app');
			inject(function($injector) {
				$controller = $injector.get('$controller');
				$log = $injector.get('$log');
				$q = $injector.get('$q');
				$rootScope = $injector.get('$rootScope');
			});

			Data = {
				get: function() {
					return $q.when(tableData);
				}
			};

			controller = $controller('AppController', {
				$log: $log,
				$scope: $rootScope,
				Data: Data
			});
		});

		it('is defined', function() {
			expect(controller).toBeDefined();
		});

		it('populates data when activated', function() {
			$rootScope.$apply();
			expect(controller.data).toEqual(tableData);
		});

		it('logs if errors while loading data on activation', function() {
			Data.get = function() {
				return $q.reject('Error loading data');
			};
			controller = $controller('AppController', {
				$log: $log,
				$scope: $rootScope,
				Data: Data
			});
			$rootScope.$apply();
			expect($log.error.logs).toEqual([['Error loading data']]);
		});

		it('limits items in `displayData` to `numRows` value', function() {
			controller.numRows = 3;
			$rootScope.$apply();
			expect(controller.displayData.length).toBe(3);
		});

		it('filters `displayData` by `filter` value', function() {
			controller.filter = 'Two';
			$rootScope.$apply();
			expect(controller.displayData).toEqual(tableData.slice(1, 2));
		});
	});
})();

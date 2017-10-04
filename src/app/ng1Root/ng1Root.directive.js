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
        template: require('./ng1Root.html')
    };
    return directive;

    function link(scope, element, attrs) {}
}
/* @ngInject */
function Ng1RootController() {}

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
        template: require('./ng1-component.html')
    };
    return directive;

    function link(scope, element, attrs) {}
}
/* @ngInject */
function Ng1ComponentController() {}

(function() {
    'use strict';

    var ctrl = ['$http', '$state', '$stateParams', '$scope', headerController]
    
    angular.module('app').controller('headerController', ctrl);

    function headerController($http, $state, $stateParams, $scope) {
        var vm = this;
        
        vm.init = function(){
            vm.state = $state;
        }();
    }
})();
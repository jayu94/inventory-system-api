(function() {
    'use strict';

    var ctrl = ['$http', '$localStorage', homeController]

    angular.module('app').controller('homeController', ctrl);

    function homeController($localStorage) {
        var vm = this;
        
        vm.init = function(){


        }();
    }
})();
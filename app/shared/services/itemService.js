(function() {
    'use strict';

    var config = ['$http', '$rootScope', '$localStorage', '$state', itemService]

    angular.module('app').factory('itemService', config);

    function itemService($http, $rootScope, $localStorage, $state) {
        
        var service = {};

        function get() {
            return $http.get($rootScope.api + '/');
        }

        return service;

    }
    
})();
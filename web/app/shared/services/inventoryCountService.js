(function() {
    'use strict';

    var config = ['$http', '$rootScope']

    angular.module('app').service('inventoryCountService', inventoryCountService);

    function inventoryCountService($http, $rootScope) {
        var url = $rootScope.api + '/physicalinventorycount/';

        var service = {
            post: post
        };

        function post (object){
            return $http.post(url + 'submit', object);
        }

        return service;

    }
})();
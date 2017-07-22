(function() {
    'use strict';

    var config = ['$http', '$rootScope', '$localStorage', '$state', warehouseTransferService]

    angular.module('app').factory('warehouseTransferService', config);

    function warehouseTransferService($http, $rootScope, $localStorage, $state) {
        
        var url = $rootScope.api + '/' + 'items'

        var service = {
            post: post,
            get : get
        };

        function get() {
            console.log(url);
            return $http.get(url);
        }

        function post(gr){
            return $http.post(url, gr);
        }

        return service;
    }
    
})();
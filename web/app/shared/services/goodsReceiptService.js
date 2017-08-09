(function() {
    'use strict';

    var config = ['$http', '$rootScope', '$localStorage', '$state', goodsReceiptService]

    angular.module('app').factory('goodsReceiptService', config);

    function goodsReceiptService($http, $rootScope, $localStorage, $state) {
        
        var url = $rootScope.api + 'goodsreceipt'

        var service = {
            getByID: getByID,
            post: post
        };

        function get() {
            return $http.get($rootScope.api + '/');
        }

        function getByID(id) {
            return $http.get(url + '/retrieve/' + id);
        }

        function post(gr){
            return $http.post(url, gr);
        }

        return service;
    }
    
})();
(function() {
    'use strict';

    var config = ['$http', '$rootScope', '$localStorage', '$state', goodsReceiptService]

    angular.module('app').factory('goodsReceiptService', config);

    function goodsReceiptService($http, $rootScope, $localStorage, $state) {
        
        var url = $rootScope.api + 'goodsreceipt'

        var service = {
            post: post
        };

        function get() {
            return $http.get($rootScope.api + '/');
        }

        function post(gr){
            return $http.post(url, gr);
        }

        return service;
    }
    
})();
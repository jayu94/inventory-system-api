(function() {
    'use strict';

    var config = ['$http', '$rootScope', '$localStorage', '$state', warehouseTransferService]

    angular.module('app').factory('warehouseTransferService', config);

    function warehouseTransferService($http, $rootScope, $localStorage, $state) {
        
        var getItems = $rootScope.api + '/' + 'items'
        var postWarehouse = $rootScope.api + '/' + 'warehouse/submit'

        var service = {
            post: post,
            get : get
        };

        function get() {
            console.log(getItems);
            return $http.get(getItems).then(function(response){
                return response.data;
            });
        }

        function post(gr){
            return $http.post(postWarehouse, gr);
        }

        return service;
    }
    
})();
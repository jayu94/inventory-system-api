(function() {
    'use strict';

    var config = ['$http', '$rootScope', '$localStorage', '$state', purchaseOrderService]

    angular.module('app').factory('purchaseOrderService', config);

    function purchaseOrderService($http, $rootScope, $localStorage, $state) {
        
        var service = {};

        function get() {
            return $http.get($rootScope.api + '/');
        }

        return service;
    }
    
})();
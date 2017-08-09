(function() {
    'use strict';

    var config = ['$http', '$rootScope', '$localStorage', '$state', issuanceService]

    angular.module('app').factory('issuanceService', config);

    function issuanceService($http, $rootScope, $localStorage, $state) {
        
        var url = $rootScope.api + 'issuance';

        var service = {
            post: post,
        };

        function get() {
            return $http.get(url);
        }

        function post(issuance) {
            return $http.post(url, issuance);
        }
        return service;
    }
    
})();
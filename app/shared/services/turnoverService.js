(function() {
    'use strict';

    var config = ['$http', '$rootScope', turnoverService]

    angular.module('app').service('turnoverService', config);

    function turnoverService($http, $rootScope) {

        var url = $rootScope.api + '/turnoverrequest/';
        
        var service = {
            post: post
        };

        function post(request) {
            return $http.post(url + 'submit', request);
        }
        
    }
})();
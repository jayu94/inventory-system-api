(function() {
    'use strict';

    var config = ['$http', '$rootScope', returnService]

    angular.module('app').service('returnService', config);

    function returnService(dependency1) {

        var url = $rootScope.api + '/returntosupplier/';

        var service = {
            post: post
        };

        function post(object){
            return $http.post(url + 'submit', object);
        }
    }
})();
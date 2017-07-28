(function() {
    'use strict';

    var config = ['$http', '$rootSco']

    angular.module('app').service('inventoryCountService', inventoryCountService);

    function inventoryCountService(dependency1) {
        var url = $rootScope.api + '/physicalinventorycount/';

        var service = {

        };

        function post (object){
            return $http.post(url + 'submit', object);
        }
    }
})();
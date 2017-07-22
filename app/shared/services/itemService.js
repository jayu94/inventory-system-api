(function() {
    'use strict';

    var config = ['$http', '$rootScope', '$localStorage', '$state', '$timeout', '$q', itemService]

    angular.module('app').factory('itemService', config);

    function itemService($http, $rootScope, $localStorage, $state, $timeout, $q) {
        
        var service = {
            get: get
        };

        function get(query, limit) {
            var deferred = $q.defer();
            var data =[
                {
                    ItemCode: 'Item-0001',
                    ItemName: 'Item-Name1',
                    Specification: 'Item-0001-Specification',
                    UoM: 'Weight',
                    UnitPrice: '100.00',
                    Quantity: 50,
                    Warranty: 'WARR1'
                },
                {
                    ItemCode: 'Item-0002',
                    ItemName: 'Item-Name2',
                    Specification: 'Item-0002-Specification',
                    UoM: 'Kilogram',
                    UnitPrice: '1200.00',
                    Quantity: 25,
                    Warranty: 'WARR1'
                },
                {
                    ItemCode: 'Item-0003',
                    ItemName: 'Item-Name3',
                    Specification: 'Item-0003-Specification',
                    UoM: 'Weight',
                    UnitPrice: '1700.00',
                    Quantity: 5,
                    Warranty: 'WARR1'
                },
                {
                    ItemCode: 'Item-0004',
                    ItemName: 'Item-Name4',
                    Specification: 'Item-Name4-Specification',
                    UoM: 'Weight',
                    UnitPrice: '12200.00',
                    Quantity: 25,
                    Warranty: 'WARR1'
                }
            ];

            $timeout(function(){
                var result = _.filter(data, function(x){ 
                    return x.ItemCode.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
                           x.ItemName.toLowerCase().indexOf(query.toLowerCase()) > -1; 
                });

                deferred.resolve(result);
            }, 500);

            return deferred.promise;
            //return $http.get($rootScope.api + '/', { params: { query: query, limit: limit }});
        }

        return service;

    }
    
})();
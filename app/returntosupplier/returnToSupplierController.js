(function() {
    'use strict';

    var ctrl = ['$http','$scope', '$state', '$stateParams', 'returnService', returnToSupplierController]

    angular.module('app').controller('returnToSupplierController', returnToSupplierController);

    function returnToSupplierController($http, $scope, $state, $stateParams, returnService) {
        var vm = this;
        
        vm.init = function(){


        }();

        vm.save = function(){

            returnService.post({}).then(
				function(response){
					console.log(response);
				}, 
				function(response){
					console.log(response);
				});
            // - UserId
            // - Status
            // - Department
            // - VendorCode 
            // - VendorName
            // - Address
            // - ContactPerson
            // - ContactNumber
            // - Items { 
            //     ItemCode
            //     Specification
            //     Reasons
            //     ExpectedPullOutDate
            //     ExpectedReturnDate
            //     IsPullOut
            //     ActualPullOutDate
            //     IsForPrint
            //     PONo
            // };

        };
    }
})();
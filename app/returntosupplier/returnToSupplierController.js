(function() {
    'use strict';

    var ctrl = ['$http','$scope', '$state', '$stateParams', 'returnService', returnToSupplierController]

    angular.module('app').controller('returnToSupplierController', returnToSupplierController);

    function returnToSupplierController($http, $scope, $state, $stateParams, returnService) {
        var vm = this;
        
        vm.init = function(){


        }();

        vm.save = function(){

            returnService.post({
                UserId: '',
                Status: 1,
                Department: vm.department,
                VendorCode: vm.vendorCode,
                VendorName: vm.vendor,
                Address: vm.address,
                ContactPerson: vm.contactPerson,
                ContactNumber: vm.contactNumber,
                Items: {
                    
                }

            }).then(
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
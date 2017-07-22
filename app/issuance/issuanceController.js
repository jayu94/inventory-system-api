(function() {
    'use strict';

    var ctrl = ['$http','$scope', '$state', '$stateParams', 'issuanceService', 'goodsReceiptService', issuanceController]

    angular.module('app').controller('issuanceController', issuanceController);

    function issuanceController($http, $scope, $state, $stateParams, issuanceService, goodsReceiptService) {
        var vm = this;

        vm.init = function(){
            vm.table = [];

            goodsReceiptService.getByID(14).then(
                function(response){
                    vm.gr = response.data;
                    vm.table = response.data.items;
                    console.log(response);
                },
                function(){
                     console.log(response);
                });
        }();

        vm.selectIndex = function(rowNo){
            vm.selected = rowNo;
        };

        vm.addRow = function(){
            vm.table.push({});
        };

        vm.deleteRow = function(){
            if(vm.selected >= 0){
                vm.table.splice(vm.selected, 1);
            }
        };

        vm.save = function(){
            issuanceService.post({
                UserID: '10001',
                RequestingUserID: '10000',
                RequestingUserDepartment: 1,
                MIFRRGRNo: '123567890',
                StatusID: 1,
            }).then(
                function(response){
                    console.log(response);
                },
                function(response){
                    console.log(response);
                });
        };
    }
})();
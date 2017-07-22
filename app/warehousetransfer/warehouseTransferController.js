(function() {
    'use strict';

    var ctrl = ['$http','$scope', '$state', '$stateParams', 'warehouseTransferService', warehouseTransferController]

    angular.module('app').controller('warehouseTransferController', warehouseTransferController);

    function warehouseTransferController($http, $scope, $state, $stateParams, warehouseTransferService) {
        var vm = this;

        vm.getItemList = function(){
            warehouseTransferService.get().then(function(response){
                vm.itemList = response.data;
            },function(response){
                console.log(response);
            });
        }

        vm.init = function(){
            vm.table = [];
            vm.getItemList();
        }();

        vm.selectIndex = function(rowNo){
            vm.selected = rowNo;
        }

        vm.addRow = function(){
            vm.table.push({});
        }

        vm.deleteRow = function(){
            if(vm.selected >= 0){
                vm.table.splice(vm.selected, 1);
            }
        }

        vm.duplicateRow = function(){
            if(vm.selected >= 0){
                var newRow = {};
                angular.merge(newRow, vm.table[vm.selected]);
                vm.table.push(newRow);
            }
        }
    }
})();
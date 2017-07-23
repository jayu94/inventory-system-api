(function() {
    'use strict';

    var ctrl = ['$http','$scope', '$state', '$stateParams', 'warehouseTransferService', 'itemService', warehouseTransferController]

    angular.module('app').controller('warehouseTransferController', warehouseTransferController);

    function warehouseTransferController($http, $scope, $state, $stateParams, warehouseTransferService, itemService) {
        var vm = this;

        vm.init = function(){
            vm.table = [];
        }();

        vm.selectIndex = function(rowNo){
            if(rowNo == vm.selected)
				vm.selected = null;
			else
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

        vm.submit = function(status){
            warehouseTransferService.post({
                UserId: '00001',
                TransferDate: null,
                Status: status,
                Items: vm.table
            }).then(function(response){
                console.log(response);
            })
        }

        vm.getItems = function(query){
            return warehouseTransferService.get(query, 10);
        }

        vm.itemSelected = function(line, item){
            angular.merge(line, item);
        }
    }
})();
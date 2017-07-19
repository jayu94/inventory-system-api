(function() {
    'use strict';

    var ctrl = ['$http','$scope', '$state', '$stateParams', '$uibModal', turnoverController]

    angular.module('app').controller('turnoverController', turnoverController);

    function turnoverController($http, $scope, $state, $stateParams, $uibModal) {
        var vm = this;
        
        vm.init = function(){
            vm.table = [];
            vm.items = [{
                itemCode: "Item-Code 001",
                itemName: "Item-Name 1",
                specification: "Spec 1",
                uom: "Kilograms",
                unitPrice: 500
            }];

        }();

        vm.openSearchModal = function (){
            $scope.modalInstance = $uibModal.open({
                animation: true,
                templateUrl: './app/turnover/search-modal.html',
                size: 'lg',
                scope: $scope,
                backdrop: 'static'
            });

            $scope.ok = function(){ $scope.modalInstance.dismiss(); }
            $scope.cancel = function(){ $scope.modalInstance.dismiss(); }
        }

        //Adding Row function
        vm.addRow = function(){
        	var itemData = vm.items[0]; 
	        vm.table.push({ itemData: itemData, RowNo: vm.rowCount });
	        vm.rowCount++; //incrementing row count...
        }

        //Selecting Rows by clicking Row Number
        vm.selectIndex = function(rowNo){
        	vm.selected = rowNo;
        }

        //Deleting Row if there's already selected
        vm.deleteRow = function(){
			if(vm.selected >= 0) {
        		vm.table.splice(vm.selected, 1);
				vm.selected = null;
			}
        }

        //Duplicating Row if there's already selected
        vm.duplicateRow = function(){
			if(vm.selected >= 0){
				var newRow = {};
				angular.merge(newRow, vm.table[vm.selected]);
				newRow.RowNo = vm.rowCount;
				vm.table.push(newRow);
				vm.rowCount++;
			}
        }
    }
})();
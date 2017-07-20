(function() {
    'use strict';

    var ctrl = ['$http','$scope', '$state', '$stateParams', physicalInventoryController]

    angular.module('app').controller('physicalInventoryController', physicalInventoryController);

    function physicalInventoryController($http, $scope, $state, $stateParams) {
        var vm = this;

        var grDataTable = {};

        vm.rowCount = 1;
        vm.grTablePIC = [];

        vm.deleteBtn = true;

        //Pre-loaded dummy data on load page
        vm.user = 'kwingkwingko';
        vm.department = 'Green Department';
        vm.picNo = '123'

        vm.itemList = [
        	{
        		itemNo: '0001',
        		description: '0001-desc',
        		uom: 'pc',
        		freeze: true,
        		counted: false,
        		counter: 'Counter 1',
        		checker: 'checker 1',
        		validator: 'validator 1',
        		specification: 'specified'
        	},
        	{
        		itemNo: '0002',
        		description: '0002-desc',
        		uom: 'pc',
        		freeze: true,
        		counted: false,
        		counter: 'Counter 2',
        		checker: 'checker 2',
        		validator: 'validator 2',
        		specification: 'specified'
        	},
        	{
        		itemNo: '0003',
        		description: '0003-desc',
        		uom: 'pc',
        		freeze: false,
        		counted: false,
        		counter: 'Counter 3',
        		checker: 'checker 3',
        		validator: 'validator 3',
        		warehouse: 'warehouse3'
        	},
        	{
        		itemNo: '0004',
        		description: '0004-desc',
        		uom: 'pc',
        		freeze: true,
        		counted: true,
        		counter: 'Counter 4',
        		checker: 'checker 4',
        		validator: 'validator 4',
        		warehouse: 'warehouse4'
        	}
        ];

        //Adding Row function
        vm.addRow = function(){
        	var itemData = vm.itemList[0]; 
	        vm.grTablePIC.push({ itemData: itemData, RowNo: vm.rowCount });
	        vm.rowCount++; //incrementing row count...
        }

        //Selecting Rows by clicking Row Number
        vm.selectIndex = function(rowNo){
        	vm.selected = rowNo;
        }

        //Deleting Row if there's already selected
        vm.deleteRow = function(){
			if(vm.selected >= 0) {
				vm.grTable.splice(vm.selected, 1);
					vm.selected = null;
			}
        }
    }
})();
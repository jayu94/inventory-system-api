

(function() {
    'use strict';

    var ctrl = ['$http','$scope', '$state', '$stateParams', '$timeout', 'itemService', physicalInventoryController]

    angular.module('app').controller('physicalInventoryController', physicalInventoryController);

    function physicalInventoryController($http, $scope, $state, $stateParams, $timeout, itemService) {
        var vm = this;

		vm.init = function(){
			var grDataTable = {};
			vm.rowCount = 1;
			vm.grTablePIC = [];
			vm.deleteBtn = true;
			//Pre-loaded dummy data on load page
			vm.user = 'kwingkwingko';
			vm.department = 'Green Department';
			vm.picNo = '123';

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
		}();

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
				vm.grTablePIC.splice(vm.selected, 1);
				vm.selected = null;
			}
        }

		vm.getItems = function(query){
			return itemService.get(query, 10);
		}

		vm.itemSelected = function(line, item){
			angular.merge(line, item);
		}

		vm.exportToExcel=function(tableId){ // ex: '#my-table'

			// var blob = new Blob([document.getElementById(tableId).innerHTML], {
			// 		type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
			// 	});
			// saveAs(blob, "Report.xls");
			

            var exportHref=excelService.tableToExcel('#' + tableId,'physical_inventory_count');
            $timeout(function(){
				location.href=exportHref;
			},100); // trigger download
        }
    }
})();
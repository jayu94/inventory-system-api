(function() {
    'use strict';

    var ctrl = ['$http','$scope', '$state', '$stateParams', 'goodsReceiptService', goodReceiptController]

    angular.module('app').controller('goodReceiptController', goodReceiptController);

    function goodReceiptController($http, $scope, $state, $stateParams, goodsReceiptService) {
        var vm = this;
        var grDataTable = {};

        vm.rowCount = 1;
        vm.grTable = [];

    	vm.deleteBtn = true;
    	vm.duplicateBtn = true;

        //Pre-loaded dummy data on load page
        vm.user = 'kwingkwingko';
        vm.grNo = 'GR-0000001';
        vm.grStatus = 'Pending';

        //Dummy Item-List
        vm.itemList = [
			{
				itemCode: 'Item-0001',
				itemName: 'Item-Name1',
				specification: 'Item-0001-Specification',
				uom: 'Weight',
				unitPrice: '100.00',
				quantity: 50
			},
			{
				itemCode: 'Item-0002',
				itemName: 'Item-Name2',
				specification: 'Item-0002-Specification',
				uom: 'Kilogram',
				unitPrice: '1200.00',
				quantity: 25
			},
			{
				itemCode: 'Item-0003',
				itemName: 'Item-Name3',
				specification: 'Item-0003-Specification',
				uom: 'Weight',
				unitPrice: '1700.00',
				quantity: 5
			},
			{
				itemCode: 'Item-0004',
				itemName: 'Item-Name4',
				specification: 'Item-Name4-Specification',
				uom: 'Weight',
				unitPrice: '12200.00',
				quantity: 25
			}
		];

        //Copy From function using Dummy Data
        vm.copyFrom = function() {
        	vm.grTable = [];
        	vm.rowCount = 1;
			var row1 = {
				RowNo: vm.rowCount,
				itemData: vm.itemList[0],
				PlaceOfDelivery: 'Test Place of Delivery1',
				AssetNo: 'Asset-0001',
				SerialNo: 'Serial-0001'
			};

	        vm.grTable.push(row1);
	        vm.rowCount++; //Sample number of count copied from...
			var row2 = {
				RowNo: vm.rowCount,
				itemData: vm.itemList[1],
				PlaceOfDelivery: 'Test Place of Delivery2',
				AssetNo: 'Asset-0002',
				SerialNo: 'Serial-0002'
			};

	        vm.grTable.push(row2);
	        vm.rowCount++; //Sample number of count copied from...
        }

        //Adding Row function
        vm.addRow = function(){
        	var itemData = vm.itemList[0]; 
	        vm.grTable.push({ itemData: itemData, RowNo: vm.rowCount });
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

        //Duplicating Row if there's already selected
        vm.duplicateRow = function(){
			if(vm.selected >= 0){
				var newRow = {};
				angular.merge(newRow, vm.grTable[vm.selected]);
				newRow.RowNo = vm.rowCount;
				vm.grTable.push(newRow);
				vm.rowCount++;
			}
        }

		vm.save = function(){
			goodsReceiptService.post({
				UserId: '00001',
				GrStatusId: 1,
				ReceivingDate: '07/22/2017',
				Source: 'SOURCE'
			}).then(function(response){
				console.log(response);
			})

		}
    }
})();
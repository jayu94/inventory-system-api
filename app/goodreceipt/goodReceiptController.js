(function() {
    'use strict';

    var ctrl = ['$http','$scope', '$state', '$stateParams', 'goodsReceiptService', 'itemService', goodReceiptController]

    angular.module('app').controller('goodReceiptController', goodReceiptController);

    function goodReceiptController($http, $scope, $state, $stateParams, goodsReceiptService, itemService) {
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
        };

        //Adding Row function
        vm.addRow = function(){
        	var itemData = vm.itemList[0]; 
	        vm.grTable.push({ itemData: itemData, RowNo: vm.rowCount });
	        vm.rowCount++; //incrementing row count...
        };

        //Selecting Rows by clicking Row Number
        vm.selectIndex = function(rowNo){
        	vm.selected = rowNo;
        };

        //Deleting Row if there's already selected
        vm.deleteRow = function(){
			if(vm.selected >= 0) {
				vm.grTable.splice(vm.selected, 1);
				vm.selected = null;
			}
		};

        //Duplicating Row if there's already selected
        vm.duplicateRow = function(){
			if(vm.selected >= 0){
				var newRow = {};
				angular.merge(newRow, vm.grTable[vm.selected]);
				newRow.RowNo = vm.rowCount;
				vm.grTable.push(newRow);
				vm.rowCount++;
			}
        };

		vm.getItems = function(query){
			return itemService.get(query, 10);
		};

		vm.itemSelected = function(line, item){
			angular.merge(line, item);
		};

		vm.save = function(){
			var data = {
				UserId: '00001',
				GrStatusId: 1,
				ReceivingDate: '07/22/2017',
				Source: 'SOURCE',
				Items: _.map(vm.grTable, function(x){
					var item = {};
					angular.merge(item, x);
					delete item.itemData;
					return item;
				}),
			};

			goodsReceiptService.post(data).then(function(response){
				console.log(response);
			});
		};
    }
})();
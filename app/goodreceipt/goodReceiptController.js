(function() {
    'use strict';

    var ctrl = ['$http','$scope', '$state', '$stateParams', goodReceiptController]

    angular.module('app').controller('goodReceiptController', goodReceiptController);

    function goodReceiptController($http, $scope, $state, $stateParams) {
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
	        grDataTable.RowNo = vm.rowCount;
	        var itemData = vm.itemList[0]; 
	        grDataTable.itemData = itemData;   
	        grDataTable.PlaceOfDelivery = 'Test Place of Delivery1';
	        grDataTable.AssetNo = 'Asset-0001';
	        grDataTable.SerialNo = 'Serial-0001';

	        vm.grTable.push(grDataTable);
	        vm.rowCount++ //Sample number of count copied from...

	        grDataTable = {};
	        grDataTable.RowNo = vm.rowCount;
	        var itemData = vm.itemList[1]; 

	        grDataTable.itemData = itemData;   
	        grDataTable.PlaceOfDelivery = 'Test Place of Delivery2';
	        grDataTable.AssetNo = 'Asset-0002';
	        grDataTable.SerialNo = 'Serial-0002';

	        vm.grTable.push(grDataTable);
	        vm.rowCount++ //Sample number of count copied from...
        }

        vm.addRow = function(){
			grDataTable = {};
        	grDataTable.RowNo = vm.rowCount;
        	var itemData = vm.itemList[0]; 

        	grDataTable.itemData = itemData;   
	        grDataTable.PlaceOfDelivery = '';
	        grDataTable.AssetNo = '';
	        grDataTable.SerialNo = '';

	        vm.grTable.push(grDataTable);
	        vm.rowCount++ //incrementing row count...
        }

        vm.selectIndex = function(rowNo){
        	var rows = $('tr');
        	vm.oldIndex = angular.isUndefined(vm.oldIndex) || vm.oldIndex == null ? 0 : vm.oldIndex;
        	
        	if(rowNo+1 == vm.oldIndex){
        		rows.eq(vm.oldIndex).css("background-color", "");

        		vm.indexSelected = null;
        		vm.oldIndex = null;

        		disableButton();
        	}
        	else{
	        	rows.eq(vm.oldIndex).css("background-color", "");
	        	rows.eq(rowNo+1).css("background-color", "darkgrey");

	        	vm.oldIndex = rowNo + 1;
	        	vm.indexSelected = rowNo;

        		enableButton();
        	}
        }

        vm.deleteRow = function(){
        	var rows = $('tr');
        	var index = vm.grTable.indexOf(vm.indexSelected);
        	grDataTable = angular.copy(vm.grTable[vm.indexSelected]);

        	rows.eq(vm.indexSelected+1).remove();

        	angular.forEach(vm.grTable, function (value, key) {
                if (value.RowNo == grDataTable.RowNo) {
                   vm.grTable.splice(value.RowNo-1, 1);
                }
            });

  			disableButton();
        }

        vm.duplicateRow = function(){
        	var rows = $('tr');

        	rows.eq(vm.indexSelected+1).css("background-color", "");
        	grDataTable = {}
        	grDataTable = angular.copy(vm.grTable[vm.indexSelected]);
        	grDataTable.RowNo = vm.rowCount;

        	vm.grTable.push(grDataTable);
        	vm.rowCount++
        	vm.indexSelected = null;
    		vm.oldIndex = null;

    		disableButton();
        }

        function disableButton(){
        	vm.deleteBtn = true;
        	vm.duplicateBtn = true;
        }

        function enableButton(){
        	vm.deleteBtn = false;
        	vm.duplicateBtn = false;
        }
    }
})();
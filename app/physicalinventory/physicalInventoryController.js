

(function() {
    'use strict';

    var ctrl = ['$http','$scope', '$state', '$stateParams', '$timeout', 'itemService', 'FileUploader', physicalInventoryController]

    angular.module('app').controller('physicalInventoryController', physicalInventoryController);

    function physicalInventoryController($http, $scope, $state, $stateParams, $timeout, itemService, FileUploader) {
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
			vm.uploader = new FileUploader();

			vm.validFields = [
				"ItemCode",
				"ItemName",
				"UoM",
				"Freeze",
				"Counted",
				"Checker",
				"Validator",
				"Specification",
				"SerialNo",
				"PropertyTagCode",
				"LocationOnRecord",
				"LocationPhysical",
				"Variance",
				"Remarks",
			];

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

		vm.uploader.onAfterAddingFile = function(fileItem) {
			var reader = new FileReader();
			reader.onload = function(e) {
				var data = e.target.result;
				var wb = XLSX.read(data, {type: 'binary'});
				var jsonResult = to_json(wb);
				var result = JSON.stringify(to_json(wb), 2, 2);
				for(var i in jsonResult){
					var sheet = jsonResult[i];
					_.forEach(sheet, function(item) {
						var newItem = {};
						_.forEach(vm.validFields, function(property){
							newItem[property] = item[property];
						});
						$timeout(function(){
							vm.grTablePIC.push(newItem);
							console.log(newItem);
						});
					});
				}
			};
			reader.readAsBinaryString(fileItem._file);
        };

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
        };

		vm.getItems = function(query){
			return itemService.get(query, 10);
		};

		vm.itemSelected = function(line, item){
			angular.merge(line, item);
		};

		function to_json(workbook) {
			var result = {};
			workbook.SheetNames.forEach(function(sheetName) {
				var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
				if(roa.length > 0){
					result[sheetName] = roa;
				}
			});
			return result;
		}
    }
})();
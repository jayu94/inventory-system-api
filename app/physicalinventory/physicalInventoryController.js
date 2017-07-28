

(function() {
    'use strict';

    var ctrl = ['$http','$scope', '$state', '$stateParams', '$timeout', 'itemService', 'FileUploader', 'inventoryCountService', physicalInventoryController]

    angular.module('app').controller('physicalInventoryController', physicalInventoryController);

    function physicalInventoryController($http, $scope, $state, $stateParams, $timeout, itemService, FileUploader, inventoryCountService) {
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
			
			vm.accountableItemHeaders = {
				ItemCode: 'ItemCode',
				ItemDescription: 'ItemDescription',
				UoM: 'UoM',
				Freeze: 'Freeze',
				Counted: 'Counted',
				Counter: 'Counter',
				Checker: 'Checker',
				Validator: 'Validator',
				Variance: 'Variance',
				Remarks: 'Remarks',
				Specification: 'Specification',
				SerialNo: 'SerialNo',
				PropertyCode: 'PropertyTagCode',
				LocationOnRecord: 'LocationOnRecord',
				LocationPhysical: 'LocationPhysical',
				AssetStatusVariance: 'AssetStatusVariance',
				AssetStatusRemarks: 'AssetStatusRemarks',
			};

			vm.warehouseItemHeaders = {
				ItemCode: 'ItemCode',
				ItemDescription: 'ItemDescription',
				UoM: 'UoM',
				Freeze: 'Freeze',
				Counted: 'Counted',
				Counter: 'Counter',
				Checker: 'Checker',
				Validator: 'Validator',
				Variance: 'Variance',
				Remarks: 'Remarks',
				AssetStatusOnRecord: 'AssetStatusOnRecord',
				AssetStatusPhysical: 'AssetStatusPhysical',
				Warehouse: 'Warehouse',
				QtyOnCountDate: 'QtyOnCountDate',
				CountedQuantity: 'CountedQuantity',
				QuantityVariance: 'QuantityVariance',
				QuantityRemarks: 'QuantityRemarks'
			};
		}();

		// import event handler
		vm.uploader.onAfterAddingFile = function(fileItem) {

			var validFields = [
				"ItemCode",
				"ItemName",
				"ItemDescription",
				"UoM",
				"Freeze",
				"Counted",
				"Checker",
				"Validator",
				"Specification",
				"SerialNo",
				"PropertyCode",
				"LocationOnRecord",
				"LocationPhysical",
				"Variance",
				"Remarks",
			];

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
						_.forEach(validFields, function(property){
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
	        vm.grTablePIC.push({ RowNo: vm.rowCount });
	        vm.rowCount++; //incrementing row count...
        };

        //Selecting Rows by clicking Row Number
        vm.selectIndex = function(rowNo){
			if(rowNo == vm.selected)
				vm.selected = null;
			else
        		vm.selected = rowNo;
        };

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

		vm.save = function(){

			inventoryCountService.post({
				UserId: '0001',
				Status: vm.picStatus,
				Department: vm.department,
				UploadDate: vm.uploadDate,
				Remarks: vm.remarks,
				ItemClass: vm.selectItem,
				Location: vm.location,
				AccountablePerson: vm.accountablePerson,
				MajorAssetCategory: vm.majorAssetCategory,
				CommodityGroup: vm.commodity,
				Warehouse: vm.warehouse,
				Items: vm.grTablePIC
			}).then(
				function(response){
					console.log(response);
				}, 
				function(response){
					console.log(response);
				});
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
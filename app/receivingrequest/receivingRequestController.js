(function() {
    'use strict';

    var ctrl = ['$http','$scope', '$state', '$stateParams', 'itemService', receivingRequestController]

    angular.module('app').controller('receivingRequestController', receivingRequestController);

    function receivingRequestController($http, $scope, $state, $stateParams, itemService) {
        var vm = this;

        //Dummy Item-List
        vm.itemList = [
            {
                itemCode: 'Item-0001',
                itemName: 'Item-Name1',
                specification: 'Item-0001-Specification',
                uom: 'Weight',
                unitPrice: '100.00',
                purchasedquantity: 50
            },
            {
                itemCode: 'Item-0002',
                itemName: 'Item-Name2',
                specification: 'Item-0002-Specification',
                uom: 'Kilogram',
                unitPrice: '1200.00',
                purchasedquantity: 25
            },
            {
                itemCode: 'Item-0003',
                itemName: 'Item-Name3',
                specification: 'Item-0003-Specification',
                uom: 'Weight',
                unitPrice: '1700.00',
                purchasedquantity: 5
            },
            {
                itemCode: 'Item-0004',
                itemName: 'Item-Name4',
                specification: 'Item-Name4-Specification',
                uom: 'Weight',
                unitPrice: '12200.00',
                purchasedquantity: 25
            }
        ];

        
        vm.init = function(){
            vm.table = [];
        }();

        vm.selectIndex = function(rowNo){
            if(rowNo == vm.selected)
				vm.selected = null;
			else
        		vm.selected = rowNo;
        };

        vm.addRow = function(){
            vm.table.push({});
        };

        vm.deleteRow = function(){
            if(vm.selected >= 0){
                vm.table.splice(vm.selected, 1);
            }
        };

        vm.getItems = function(query){
			return itemService.get(query, 10);
		};

		vm.itemSelected = function(line, item){
			angular.merge(line, item);
		};
    }
})();
(function() {
    'use strict';

    var ctrl = ['$http','$scope', '$state', '$stateParams', issuanceAcceptanceController]

    angular.module('app').controller('issuanceAcceptanceController', issuanceAcceptanceController);

    function issuanceAcceptanceController($http, $scope, $state, $stateParams) {
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
    }
})();
(function() {
    'use strict';

    var ctrl = ['$http','$scope', '$state', '$stateParams', issuanceController]

    angular.module('app').controller('issuanceController', issuanceController);

    function issuanceController($http, $scope, $state, $stateParams) {
        var vm = this;

        vm.init = function(){
            vm.table = [];


        }();

        vm.selectIndex = function(rowNo){
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
    }
})();
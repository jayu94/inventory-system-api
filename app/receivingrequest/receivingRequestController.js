(function() {
    'use strict';

    var ctrl = ['$http','$scope', '$state', '$stateParams', receivingRequestController]

    angular.module('app').controller('receivingRequestController', receivingRequestController);

    function receivingRequestController($http, $scope, $state, $stateParams) {
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
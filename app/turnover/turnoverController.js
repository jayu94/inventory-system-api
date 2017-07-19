(function() {
    'use strict';

    var ctrl = ['$http','$scope', '$state', '$stateParams', '$uibModal', turnoverController]

    angular.module('app').controller('turnoverController', turnoverController);

    function turnoverController($http, $scope, $state, $stateParams, $uibModal) {
        var vm = this;
        
        vm.init = function(){


        }();

        vm.openSearchModal = function (){
            $scope.modalInstance = $uibModal.open({
                animation: true,
                templateUrl: './app/turnover/search-modal.html',
                size: 'lg',
                scope: $scope,
                backdrop: 'static'
            });
        }
    }
})();
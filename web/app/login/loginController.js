(function() {
	"use strict";

	var ctrl = ['$state', '$stateParams', 'userService', 'messageService', loginController];

    angular.module("app").controller(ctrl);

    function loginController($state, $stateParams, userService, messageService) {
        var vm = this;
        vm.login = login;
        vm.user = {};

        function login() {
            userService.login(vm.user.email, vm.user.password)
            .then(
                function(response){
                    console.log(response);
                    $state.go('home');
                },
                function (response){
                    console.log(response);
                    messageService.show(response);
                }
            )
        }
    }

})();
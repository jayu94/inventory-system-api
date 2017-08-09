(function() {
	angular.module('app', [
			'ui.router',
			'angular-loading-bar',
			'ngStorage',
			'ui.bootstrap',
			'ngTouch', 
			'ngAnimate', 
			'ngSanitize',
			'angularFileUpload',
			'ngJsonExportExcel'
		])
		.run(['$rootScope', '$state', 'userService', 'messageService', function run($rootScope, $state, userService, messageService) {

			// $rootScope.api = "http://192.168.0.107/csb/public/";
			// $rootScope.api = "http://192.168.0.108:8080/inventory-api/public/";
			$rootScope.api = "http://csb-app.azurewebsites.net/api/";

			// uncomment if login is implemented

			// $rootScope.$on('unauthorized', function () {
			// 	$state.go("login");
			// 	messageService.show("You have been logged out");
			// });

			// $rootScope.logout = function(){
			// 	$state.go('login');
			// };

			// $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams, options){
			// 	if(!userService.authenticated() && toState.name != 'login'){
			// 		event.preventDefault();
			// 		$state.go('login');
			// 	}
			// 	else if(userService.authenticated() && toState.name == 'login'){
			// 		event.preventDefault();
			// 		$state.go('home');
			// 	}
			// });
		}]);

})();
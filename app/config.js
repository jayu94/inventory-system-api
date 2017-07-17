(function(){
	var app = angular.module("app");

	app.factory('interceptor', ['$q', '$rootScope', '$localStorage', interceptor]);
	app.config(['$httpProvider', 'cfpLoadingBarProvider', config]);

	function interceptor ($q, $rootScope, $localStorage) {
		var service = {
			request: function (config) {
				if($localStorage.access_token)
					config.headers.Authorization = 'Bearer ' + $localStorage.access_token;
				return config;
			},
			responseError: function (response) {
				console.log(response);
				if (response && response.error == "token_not_provided" || (response.status && response.status == 401)) {
					delete $localStorage.user;
					delete $localStorage.access_token;
					$rootScope.$broadcast('unauthorized');
				}
				return $q.reject(response);
			}
		};
		return service;
	}

	function config ($httpProvider, cfpLoadingBarProvider){
		//$mdThemingProvider.theme('default')
		//.primaryPalette('pink')
		//.accentPalette('red');
			$httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = '*';

		cfpLoadingBarProvider.includeSpinner = false;
		$httpProvider.interceptors.push('interceptor');
	}

})();
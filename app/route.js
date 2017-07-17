(function () {
    var config = ["$stateProvider", "$urlRouterProvider", "$locationProvider", route];
    
    angular.module('app').config(config)

    function route($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.hashPrefix('');
        // $locationProvider.html5Mode(true);

        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state('home', {
                url: "/",
                templateUrl: 'app/home/index.html'
            })
            .state('login', {
                url: "/login",
                templateUrl: "app/login/index.html",
                controller: "loginController",
                controllerAs: "vm"
            })
    }

})()
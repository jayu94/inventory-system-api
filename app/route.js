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
            .state('turnover', {
                url: "/turnover",
                templateUrl: "app/turnover/index.html",
                // controller: "loginController",
                // controllerAs: "vm"
            })
            .state('receivingrequest', {
                url: "/receivingrequest",
                templateUrl: "app/receivingrequest/index.html",
                // controller: "loginController",
                // controllerAs: "vm"
            })
            .state('goodreceipt', {
                url: "/goodreceipt",
                templateUrl: "app/goodreceipt/index.html",
                // controller: "loginController",
                // controllerAs: "vm"
            })
            .state('issuance', {
                url: "/issuance",
                templateUrl: "app/issuance/index.html",
                // controller: "loginController",
                // controllerAs: "vm"
            })
            .state('issuanceacceptance', {
                url: "/issuanceacceptance",
                templateUrl: "app/issuanceacceptance/index.html",
                // controller: "loginController",
                // controllerAs: "vm"
            })
            .state('warehousetransfer', {
                url: "/warehousetransfer",
                templateUrl: "app/warehousetransfer/index.html",
                // controller: "loginController",
                // controllerAs: "vm"
            })
            .state('returntosupplier', {
                url: "/returntosupplier",
                templateUrl: "app/returntosupplier/index.html",
                // controller: "loginController",
                // controllerAs: "vm"
            })
    }

})()
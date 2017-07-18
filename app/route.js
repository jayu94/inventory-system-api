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
                header: "Turnover",
                controller: "turnoverController",
                controllerAs: "vm"
            })
            .state('receivingrequest', {
                url: "/receivingrequest",
                templateUrl: "app/receivingrequest/index.html",
                header: "Receiving Request",
                controller: "receivingRequestController",
                controllerAs: "vm"
            })
            .state('goodreceipt', {
                url: "/goodreceipt",
                templateUrl: "app/goodreceipt/index.html",
                header: "Good Receipt",
                controller: "goodReceiptController",
                controllerAs: "vm"
            })
            .state('issuance', {
                url: "/issuance",
                templateUrl: "app/issuance/index.html",
                header: "Issuance",
                controller: "issuanceController",
                controllerAs: "vm"
            })
            .state('issuanceacceptance', {
                url: "/issuanceacceptance",
                templateUrl: "app/issuanceacceptance/index.html",
                header: "Issuance Acceptance",
                controller: "issuanceAcceptanceController",
                controllerAs: "vm"
            })
            .state('warehousetransfer', {
                url: "/warehousetransfer",
                templateUrl: "app/warehousetransfer/index.html",
                header: "Warehouse Transfer",
                controller: "warehouseTransferController",
                controllerAs: "vm"
            })
            .state('returntosupplier', {
                url: "/returntosupplier",
                templateUrl: "app/returntosupplier/index.html",
                header: "Return to Supplier",
                controller: "returnToSupplierController",
                controllerAs: "vm"
            })
            .state('physicalinventory', {
                url: "/physicalinventory",
                templateUrl: "app/physicalinventory/index.html",
                header: "Physical Inventory",
                controller: "physicalInventoryController",
                controllerAs: "vm"
            })
    }

})()
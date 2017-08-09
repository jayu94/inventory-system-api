(function() {
    'use strict';

    var config = [messageService];
    
    angular.module('app').factory("messageService", config);

    function messageService() {
        var service = {
            show: show
        };
        
        function show(content){
            var message = "";
            if(typeof content === "string"){
                message = content;
            }
            else if (content.message && typeof content.message === "string"){
                message = content.message;
            }
            else if (content.data && typeof content.data === "string"){
                message = content.data;
            }
            else if (content.data && typeof content.data === "object" &&
            content.data.message && typeof content.data.message === "string"){
                message = content.data.message;
            }
            else if (content.data && typeof content.data === "object" &&
            content.data.error && typeof content.data.error === "string"){
                message = content.data.error;
            }
        }
        return service;
    }

})();